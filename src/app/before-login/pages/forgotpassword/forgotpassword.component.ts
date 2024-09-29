import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/Services/authentication/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})


export class ForgotpasswordComponent {
  emailval: any;
  forgotForm:FormGroup
  constructor(private spinner:NgxSpinnerService ,private router: Router,private _registerdetails:RegisterService,private _formValue:FormBuilder){
  this.forgotForm= this._formValue.group({
    forgotemail:['',[Validators.required,Validators.email]]
  })
  }

  get emailvalue(){
    return this.forgotForm.get('forgotemail')
  }

  loginPage(){
    this.router.navigate(['/auth/login'])
  }
  
  
  verifyemailid(val:any){
    // console.log(val)
    this.spinner.show();
    this._registerdetails.findEmail({useremail:val.forgotemail}).subscribe({
      next:(res:any)=>{
        this.spinner.hide();
        // console.log(res);
        Swal.fire({
      title:"Enter OTP.",
      input:"text",
      confirmButtonText:'Next',
      allowOutsideClick:false,
      showCancelButton:true,
      showLoaderOnConfirm:true,
      preConfirm:(otp)=>{
        if(otp.length !== 6){
          return Swal.showValidationMessage('Invalid OTP');
        }
        Swal.fire({
            title:'New Password',
            input:'text',
            confirmButtonText:'Next',
            allowOutsideClick:false,
            showCancelButton:true,
            showLoaderOnConfirm:true,
            preConfirm:async (password)=>{
              try {
                const response = await fetch('https://c8bltjmv-3000.inc1.devtunnels.ms/auth/password',{
                  method:'PATCH',
                  headers:{"Content-Type":"application/json"},
                  body:JSON.stringify({otp,password,email:val.forgotemail})
                })
  
                if(response.ok){
                  return "Password Updated! please Login again.";
                } 
              } catch (error) {
                return Swal.showValidationMessage(`Error! Try Again.`);
              }
              
            }
          })
          .then((val)=>{
            if(val.value==="Password Updated! please Login again."){
            Swal.fire({
              title:'Password Updated Successfully',
              icon:'success',
              timer:3000
            })
            setTimeout(()=>{this.router.navigate(['/auth/login']);},3000);
          }
          })
      }
    })
        
      },
      error:(err)=>{
        this.spinner.hide();
        console.log(err.error);
        
      }
     })  
  }


  inputchange(e:any){
    this.emailval = e.target.value
    let val :null |any =  document.querySelector('.requiredfield')
    if(this.emailval == ''){
    
      val.style.display = 'block'
    }
    else{
     
      val.style.display = 'none'
    }
  }
 
}
