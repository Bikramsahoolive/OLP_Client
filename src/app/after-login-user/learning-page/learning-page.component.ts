import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-learning-page',
  templateUrl: './learning-page.component.html',
  styleUrls: ['./learning-page.component.scss']
})
export class LearningPageComponent implements OnInit  {
  activeTab: string = 'course-content'; // Default tab
  id:number =1
  data:any ={}
  progress:any={};
  learings = false
  videoP=''
  isQuizPresent = false
  selectedOptions: number[] = [];
  score: number = 0;
  quiz:any=[];
  quizSubmitted: boolean = false;
  assignment :any
  answers: string[] = [];
  submissionStatus: string | null = null;

  constructor(private courseService:CoursesService, private toaster:ToastrService ,private router:ActivatedRoute,public sanitizer: DomSanitizer,private spinner:NgxSpinnerService, private route:Router){}
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    // console.log(this.id)
   this.loadDataBasedOnTab();
   this.studentProgress();
  
  }

  studentProgress(){
    this.courseService.getProgress(this.id).subscribe({
      next:(res:any)=>{
        // console.log(res)
        this.progress = res;
        this.quizSubmitted = res.quizstatus;
        this.score = res.quizresult;

      },
      error:(err)=>{
        console.log(err.error)
      }
    })
  }

  onLearningComplt(){
    Swal.fire({
      text:'Are You Completed Your Learning On This Course ?',
      icon:'question',
      confirmButtonText:'Yes',
      showCloseButton:true,
      allowOutsideClick:false,
    })
    .then((resp)=>{
      if(resp.isConfirmed){
        this.spinner.show();
    this.courseService.completeLearning(this.id).subscribe({
      next:(res:any)=>{
        // console.log(res)
        this.setActiveTab('course-content');
        this.spinner.hide();
        // this.learings = true;
        this.toaster.success(res.message);
      },
      error:(err)=>{
        this.spinner.hide()
        console.log(err.error);
        this.toaster.error('Something wents wrong,Try again! ')
      }
    })
      }
    })
  }

  loadDataBasedOnTab(): void {
    if(this.activeTab == 'course-content'){
      this.studentProgress()
      this.loadData()
    }
    else if (this.activeTab == 'quizzes'){
      this.studentProgress()
        this.loadQuiz()
    }
    else if (this.activeTab == 'assignments'){
      this.studentProgress()
        this.loadAssigments();
    }
  }

  loadData(){
    this.spinner.show()
    this.courseService.getOneCourse(this.id).subscribe({
      next:(res:any)=>{
        this.data = res
        this.videoP = `https://www.youtube.com/embed/${res.videolink.split('?v=')[1]}`;
        this.data.bannerimage = JSON.parse(res.bannerimage).url
        this.data.pdf = JSON.parse(res.pdf)
        this.spinner.hide()
      },
      error:(err)=>{
        console.log(err)
        this.spinner.hide()
      },
      complete:()=>{
        this.studentProgress()
      }
    })
  }

  loadQuiz(){
    this.spinner.show()
    this.courseService.getQuizzes(this.id).subscribe({
      next:(res:any)=>{
        this.quiz = res
        // console.log(res);
        
        if(this.quiz.length ==0){
          this.isQuizPresent=false;
          this.quizSubmitted = true
        }
        else{
          this.selectedOptions = new Array(this.quiz?.length).fill(-1);
          this.isQuizPresent = true
        }
        this.spinner.hide()
        // console.log(this.isQuizPresent);
        // console.log(this.quizSubmitted);
        
      },
      error:(err)=>{
        console.log(err.error)
        this.spinner.hide()
      },
      complete:()=>{
        this.studentProgress()
      }
    })
  }

  loadAssigments(){
    this.spinner.show()
    this.courseService.getAssignments(this.id).subscribe({
      next:(res:any)=>{
        // console.log(res)
        this.assignment = res
        this.answers = new Array(this.assignment.length).fill('');
        this.spinner.hide()
      },
      error:(err)=>{
        console.log(err.error)
        this.spinner.hide()
      }
    })
  }

  setActiveTab(tab: string) {
    //check previous step completed or not.
    if(tab =='quizzes'){
      if(!this.progress.learningstatus){
        this.toaster.error('Please Complete Learning');
        return;
      }
    }

     if(tab =='assignments'){
        if(!this.progress.quizstatus || !this.progress.learningstatus){
          this.toaster.error('Please Complete Learning and Quizzes');
          return;
        }
      }

    this.activeTab = tab;
    this.loadDataBasedOnTab(); 
  }

  selectOption(questionIndex: number, optionIndex: number): void {
    this.selectedOptions[questionIndex] = optionIndex;
  }

  submitQuiz(): void {
    // Swal.fire({
    //   text:
    // })
    this.spinner.show();
    this.quizSubmitted = true;
    this.score = 0;
    this.quiz.forEach((q:any, i:any) => {
      if (this.selectedOptions[i] === q.correctOption) {
        this.score++;
      }
    });
    let result = {
      result:this.score
    }
    this.courseService.completeQuiz(this.id,result).subscribe({
      next:(res)=>{
        console.log(res);
        this.setActiveTab('quizzes');
      },
      error:(err)=>{
        this.spinner.hide();
        console.log(err.error);
        
      }
    })
  }

  // resetQuiz(): void {
  //   this.selectedOptions.fill(-1);
  //   this.score = 0;
  //   this.quizSubmitted = false;
  // }

  submitAssignment(): void {
    // console.log({answers:this.answers});
    this.spinner.show();
    this.courseService.completeAssignment(this.id,{answers:this.answers}).subscribe({
      next:(res)=>{
        console.log(res);
        this.spinner.hide();
        this.setActiveTab('assignments');
      },
      error:(err)=>{
        this.spinner.hide();
        console.log(err.error);
        
      }
    });
  }
  certificateDownload(){
    if(!this.progress.learningstatus || !this.progress.quizstatus || !this.progress.assignmentstatus){
      this.toaster.error('Please complete previous steps to download certificate');
      return;
    }
    //download certficate;
    this.route.navigate([`userDashboard/certificate/${this.id}`]);
  }

  // resetAssignment(): void {
  //   this.answers.fill('');
  //   this.submissionStatus = null;
  // }
}
