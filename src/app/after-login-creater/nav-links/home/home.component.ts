import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreterServicesService } from 'src/app/Services/creter-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  courses = []
  nocourses = false
  sanitizedCourses:any[] = []
  constructor(private router: Router, private creatorService: CreterServicesService, private toaster: ToastrService, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    // const id = 0;
    // const formdata = new FormData();
    // formdata.append('id', '0');
    // console.log(formdata.get('id'), 'jkdsfhjksh');
    this.loadData()
  }

  loadData() {
    this.spinner.show()
    this.sanitizedCourses=[]
    this.creatorService.allCourses().subscribe({
      next: (res: any) => {
        this.courses = res
        res.forEach((course: any) => {
          this.sanitizedCourses.push({
            ...course,
            sanitizedBannerimage: JSON.parse(course.bannerimage).url
          })
        })
        this.spinner.hide()
      },
      error: (err) => {
        console.log(err)
        this.nocourses = true
        this.toaster.error()
        this.spinner.hide()
      },
      complete: () => {
        if (this.courses.length == 0) {
          this.nocourses = true
        }
        else {
          this.nocourses = false
        }
        this.spinner.hide()
      }
    })
  }

  deleteCourse(id: any) {
    
    Swal.fire({
      text:'Are you sure? want to delete this course, This action is irreversible.',
      confirmButtonText:'Confirm',
      confirmButtonColor:'orange',
      icon:'question',
      showCancelButton:true
    })
    .then((resp)=>{
      if(resp.isConfirmed){
        
    this.spinner.show()
    this.creatorService.deleteOneCourse(id).subscribe({
      next: (res: any) => {
        this.toaster.success(res.message)
        this.spinner.hide()
      },
      error: (err) => {
        console
        this.spinner.hide()
      },
      complete: () => {
        this.loadData()
      }
    })

      }
    })
  }

  // editProduct(product){
  //   console.log(product);
  //   this.router.navigate(['/seller/add-product']);
  //   this.mdm.setValue(product)

  // }


}

