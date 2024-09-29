import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {ActivatedRoute,Route, Router} from '@angular/router'
import { RegisterService } from 'src/app/Services/authentication/register.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent {
  name:string = '';
  userType:string = '';
  userData:any;
  constructor(private toastr:ToastrService,private route:ActivatedRoute,private auth:RegisterService, private spinner:NgxSpinnerService,private router:Router) {}

   async ngAfterViewInit(){
    const token = this.route.snapshot.paramMap.get('token')||'';
    let data =await JSON.parse(atob(token));
    this.userData = data;
    this.name = data.username;
    if (data.usertype)this.userType= data.usertype;
    
    
  }
  creatorGlogin(){
    this.spinner.show()
    let loginData = this.userData;
    loginData.usertype = 'creator';
    this.auth.loginWithGoogleUser(loginData).subscribe(({
      next:(res)=>{
        this.spinner.hide();
        // console.log(res);
        const sid = btoa(JSON.stringify(res));
        localStorage.setItem('sid',sid);

        this.router.navigate(['/createrDashboard'],{
          relativeTo:this.route,
          queryParams:{token:null},
          queryParamsHandling:'merge',
          replaceUrl:true

        });
      },error:(err)=>{
        this.spinner.hide();
        this.toastr.error('Something wents wrong.');
        console.log(err.error);
        
      }
    }))

    
  }
  studentGlogin(){
    this.spinner.show();
    let loginData = this.userData;
    loginData.usertype = 'student';
    this.auth.loginWithGoogleUser(loginData).subscribe(({
      next:(res)=>{
        this.spinner.hide();
        const sid = btoa(JSON.stringify(res));
        localStorage.setItem('sid',sid);
        this.router.navigate(['/userDashboard'],
          {
          relativeTo:this.route,
          queryParams:{token:null},
          queryParamsHandling:'merge',
          replaceUrl:true

        }
      );
      },error:(err)=>{
        this.spinner.hide();
        this.toastr.error('Something wents wrong.');
        console.log(err.error);
        
      }
    }))
  }

}
