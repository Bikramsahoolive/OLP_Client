import { Component, HostListener } from '@angular/core';
import { CoursesService } from 'src/app/Services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.scss']
})
export class SingleCourseComponent {
  course: any
  id:any
  bannerimage: string = ''
  constructor(private courseService: CoursesService, private route: ActivatedRoute,private router: Router,private toaster:ToastrService,private spinner:NgxSpinnerService) { }

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 240; // Adjust the value as needed
  }

  ngOnInit() {
   this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.spinner.show();
    this.courseService.getOneCourse(this.id).subscribe({
      next: (res) => {
        this.spinner.hide();
        // console.log(res)
        this.course = res
        this.bannerimage = JSON.parse(this.course.bannerimage).url

      },
      error: (err) => {
        this.spinner.hide();
        console.log(err.error)
      }
    })
  }

  onEnroll() {
    this.spinner.show();
    this.courseService.enrollCourse(this.id).subscribe({
      next: (res:any) => {
        this.spinner.hide();
        this.toaster.success(res.message)
        this.router.navigate(['userDashboard/enrolled-courses', this.id]);
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err.error);
      }
    })
  }

}


// course = {
//   title: 'The Complete 2024 Web Development Bootcamp',
//   description: 'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps.',
//   ratings: 4.7,
//   totalRatings: 403488,
//   totalStudents: 1342538,
//   instructor: 'Dr. Angela Yu',
//   lastUpdated: '8/2024',
//   language: 'English',
//   otherLanguages: ['English', 'Arabic [Auto]'],
//   price: 499,
//   discount: 3099,
//   discountText: '84% off',
//   timeLeft: '1 day left at this price!',
//   imageUrl: 'assets/preview-course.jpg', // Path to course image
// };

