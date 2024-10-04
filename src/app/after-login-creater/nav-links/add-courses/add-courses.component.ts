import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreterServicesService } from 'src/app/Services/creter-services.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss']
})

export class AddCoursesComponent {
  courseForm: FormGroup;
  bannerimg: any;
  docpdf: any;

  constructor(private fb: FormBuilder, private courseService: CreterServicesService, private toaster: ToastrService, private spinner: NgxSpinnerService) {
    this.courseForm = this.fb.group({
      category: ['', Validators.required],
      coursename: ['', Validators.required],
      bannerimage: ['', Validators.required],
      videolink: ['', Validators.required],
      pdf: ['', Validators.required],
      totalenrolments: [0],
      description: ['', Validators.required],
      quizzes: this.fb.array([]),
      assignments: this.fb.array([])
    });
  }

  ngOnInit() { }

  ResetForm() {
    this.courseForm = this.fb.group({
      category: ['', Validators.required],
      coursename: ['', Validators.required],
      bannerimage: ['', Validators.required],
      videolink: ['', Validators.required],
      pdf: ['', Validators.required],
      totalenrolments: [0],
      description: ['', Validators.required],
      quizzes: this.fb.array([]),
      assignments: this.fb.array([])
    });
  }

  get quizArray(): FormArray {
    return this.courseForm.get('quizzes') as FormArray;
  }

  addQuiz() {
    const quizGroup = this.fb.group({
      question: ['', Validators.required],
      correctOption: [null, Validators.required], // Store the index of the correct option
      options: this.fb.array([])
    });

    this.quizArray.push(quizGroup);
  }

  getOptions(quizIndex: number): FormArray {
    return (this.quizArray.at(quizIndex) as FormGroup).get('options') as FormArray;
  }

  addOption(quizIndex: number) {
    const optionsArray = this.getOptions(quizIndex);
    if (optionsArray.length < 4) {
      const optionGroup = this.fb.group({
        optionText: ['', Validators.required]
      });
      optionsArray.push(optionGroup);
    }
  }


  setCorrectOption(quizIndex: number, optionIndex: number) {
    const quizGroup = this.quizArray.at(quizIndex) as FormGroup;
    quizGroup.get('correctOption')?.setValue(optionIndex);
  }

  deleteQuiz(index: number) {
    this.quizArray.removeAt(index);
  }

  get assignmentArray(): FormArray {
    return this.courseForm.get('assignments') as FormArray;
  }

  addAssignment() {
    const assignmentGroup = this.fb.group({
      assignmentQuestion: ['', Validators.required]
    });

    this.assignmentArray.push(assignmentGroup);
  }

  deleteAssignment(index: number) {
    this.assignmentArray.removeAt(index);
  }

  async uploadimage(event: any) {
    const file = event.target.files[0];
    if (file.size > 1048576) {
      this.toaster.error("File size must be less than 1MB");
    }
    else {
      this.bannerimg = await this.convertToBase64(file)
    }
  }

  convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  async uploaddoc(event: any) {
    const file = event.target.files[0];
    if (file.size > 10485760) {
      this.toaster.error("File size must be less than 10MB")
    } else {
      this.docpdf = await this.convertToBase64(file)
    }
  }

  submitCourseForm(val: any) {
    this.spinner.show()
    this.courseForm.value.bannerimage = this.bannerimg
    this.courseForm.value.pdf = this.docpdf
    if (this.courseForm.valid) {
      this.courseService.addCourse(this.courseForm.value).subscribe({
        next: (res: any) => {
          this.toaster.success(res.message)
          this.ResetForm()
          this.spinner.hide()
        },
        error: (err) => {
          console.log(err.error)
          this.toaster.error("Some error occured")
          this.spinner.hide()
        }
      })
    }
    else {
      this.toaster.error("Please fill all the required fields")
      this.spinner.hide()
    }


  }
}

