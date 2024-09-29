import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoursesService } from 'src/app/Services/courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // public courses: any = [];
  public sanitizedCourses: any[] = [];
  page:number=1
  constructor(private courseService: CoursesService, private spinner:NgxSpinnerService) {
  }
  ngOnInit(): void {
    this.filterData('');
  }

  filterData (type:string){
    this.sanitizedCourses = [];
    this.spinner.show();
    this.courseService.getAllCourse().subscribe({
      next: (res: any) => {
        this.spinner.hide();
        // this.courses = res;
        // console.log(JSON.parse(res[0].bannerimage))
        let result = res.forEach((course: any) => {
          if(type==''){
            this.sanitizedCourses.push( {
              ...course,
              sanitizedBannerimage: JSON.parse(course.bannerimage).url
            });
          }else if(type === 'Web Development'){
            if(course.category === type){
              
              this.sanitizedCourses.push( {
                ...course,
                sanitizedBannerimage: JSON.parse(course.bannerimage).url
              });
            }
          }else if(type === 'App Development'){
            if(course.category === type){
              this.sanitizedCourses.push ({
                ...course,
                sanitizedBannerimage: JSON.parse(course.bannerimage).url
              })
            }
          }else if(type === 'Machine Learning and AI'){
            if(course.category == type){
              this.sanitizedCourses.push( {
                ...course,
                sanitizedBannerimage: JSON.parse(course.bannerimage).url
              })
            }
          }
          
        });
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err.error)
      }
    })
  }

  filterContent(filter:any){
    this.filterData(filter.value);
  }

  scrollToTop(){
    window.scrollTo({top:0,behavior:'smooth'});
  }
}
