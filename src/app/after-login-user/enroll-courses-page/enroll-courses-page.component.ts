import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from 'src/app/Services/courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enroll-courses-page',
  templateUrl: './enroll-courses-page.component.html',
  styleUrls: ['./enroll-courses-page.component.scss']
})
export class EnrollCoursesPageComponent implements OnInit {
  courses: any = []
  filterCourses: any = []
  constructor(private courseService: CoursesService,private spinner:NgxSpinnerService,private toastr:ToastrService) {

  }
  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.spinner.show()
    this.courseService.getenrollCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.filterCourses = this.courses.map((item: any) => {
          let imageUrl = '';
          if (item.bannerimage) {
            try {
              const parsedImage = JSON.parse(item.bannerimage);
              imageUrl = parsedImage?.url || '';
            } catch (e) {
              console.error('Error parsing bannerimage', e);
            }
          }
          return {
            ...item,
            image: imageUrl
          }
        });
  
        this.spinner.hide()
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide()
      }
    });
  }

  unenrollCourse(id:number){
    console.log(id);
    Swal.fire({
      icon:'question',
      text:'Are you sure want to unenroll this course, this action is irreversible.',
      confirmButtonText:'Sure'
    })
    .then((resp)=>{
      if(resp.isConfirmed){
        this.spinner.show();
        this.courseService.unenrollCourse(id).subscribe({
          next:(res)=>{
            this.spinner.hide();
            // console.log(res);
            this.toastr.success('course unenrolled successfully.');
            this.loadData();
            
          },error:(err)=>{
            this.spinner.hide();
            this.toastr.error('something wents wrong,please try again.');
            console.log(err.error); 
          }
        })
      }
    });
  }
  

}
