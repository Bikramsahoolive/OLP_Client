import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toast, ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/Services/authentication/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {


  RegisterForm: FormGroup;
  isUserRegistered: boolean = false;
  userName: string = ''
  password: string = ''
  email: string = ''
  iseyeclicked = false;
  constructor(public _registerdata: FormBuilder, private router: Router, private _registerdetails: RegisterService,private toastr:ToastrService, private spinner:NgxSpinnerService) {
    this.RegisterForm = this._registerdata.group({
      username: ['', [Validators.required, Validators.maxLength(40)]],
      usertype: ['', [Validators.required]],
      useremail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+(?=.*[@$!%*?&]).{8,}$')]],
      cpassw: ['', Validators.required],
    })
  }

  eyebtnclicked() {
    this.iseyeclicked = !this.iseyeclicked
  }

  get Username() {
    return this.RegisterForm.get('username')
  }

  get usertype() {
    return this.RegisterForm.get('usertype')
  }

  get useremail() {
    return this.RegisterForm.get('useremail')
  }

  get paassword() {
    return this.RegisterForm.get('password')
  }

  get confpass() {
    return this.RegisterForm.get('cpassw')
  }

  onRegister(data: any) {
    if (data.password === data.cpassw) {
      this.isUserRegistered = true;
      delete data.cpassw;
      this.spinner.show();
      this._registerdetails.getRegistration(data).subscribe({
        next: (res) => {
          this.spinner.hide();
          this.toastr.success('Registration Completed.');
          this.router.navigate(['/auth/login'])
          // res.forEach((element: { useremail: string; }) => {
          //   if (element.useremail == data.useremail) {
          //     this.isUserRegistered = false
          //     // this.toastr.warning("User is already Registered")
          //   }
          // });

          // if (this.isUserRegistered) {
          //   this._registerdetails.addRegistration(data).subscribe({
          //     next: (res) => {
          //       localStorage.setItem("token", res.token)
          //       // this.toastr.success("Registered successfully")
          //       this.router.navigate(['login'])
          //     }
          //   })
          // }
        },error:(err)=>{
          this.spinner.hide();
          console.log(err);
          if(err.error.status =='failure'){
            this.toastr.error(err.error.message);
            return;
          }
          this.toastr.error('Something wents wrong');
        }

      })
    }
    else {
      // this.toastr.error("password does not match")
    }

  }

  loginPage() {
    this.router.navigate(['/auth/login']);
  }

}

