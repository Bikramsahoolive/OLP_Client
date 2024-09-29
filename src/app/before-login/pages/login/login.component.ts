import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/Services/authentication/register.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  LoginForm: FormGroup;
  email: string = ''
  password: string = ''
  iseyeclicked = false;

  constructor(private spinner:NgxSpinnerService,public _logindata: FormBuilder, private router: Router, private _registerdetails: RegisterService,private toastr: ToastrService) {
    this.LoginForm = this._logindata.group({
      email: ['', [Validators.required, Validators.email]],
      usertype: ['', [Validators.required]],
      passw: ['', Validators.required],
    })
  }

  eyebtnclicked() {
    this.iseyeclicked = !this.iseyeclicked
  }

  get useremail() {
    return this.LoginForm.get('email');
  }

  get usertype() {
    return this.LoginForm.get('usertype')
  }

  get paassword() {
    return this.LoginForm.get('email');
  }

  onLogin(data: any) {
    this.spinner.show();
    let value = {
      useremail: data.email,
      usertype:data.usertype,
      password: data.passw
    }
    this._registerdetails.loginUser(value).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        const sid = btoa(JSON.stringify(res));
        localStorage.setItem('sid',sid);

        if(res.usertype =='creator'){
            this.router.navigate(['/createrDashboard']);
            this.scrollToTop();
        }
        else{
          this.router.navigate(['/userDashboard'])
          this.scrollToTop();
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
        this.toastr.error(err.error.message)
      }
    })
  }

  registerPage() {
    this.router.navigate(['/auth/register']);
    this.scrollToTop();
  }

  forgotpage() {
    this.router.navigate(['/auth/forgot-password']);
    this.scrollToTop();
  }
  scrollToTop(){
    window.scrollTo({top:0,behavior:'smooth'});
  }

}
