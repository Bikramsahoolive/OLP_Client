import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private router: Router,private _registerdetails:RegisterService,private _formValue:FormBuilder){
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
  
  // verifyemailid(val:any){
  //   let emailfound = false
  //   this._registerdetails.getRegistration().subscribe({
  //     next:(res)=>{
  //        res.forEach((element: { useremail: string;id:number  }) => {
  //          if(element.useremail == val.forgotemail){
  //          emailfound= true;
  //           this.router.navigate(['/forgot-passwordfield'],{queryParams:{id:element.id}})
  //          }
  //        });
  //       if(emailfound){
  //         this.toastr.success("Email Found")
  //       }
  //       else{
  //         this.toastr.error("Email not found")
  //       }
  //     }
  //    })  
  // }

  
  verifyemailid(val:any){
    // console.log(val)
    // Swal.fire({
    //   html:`<input type="number" id="otp" placeholder="Enter OTP"style="margin-bottom: 20px;border-radius: 8px;padding: 5px 20px;width: 75%;border: 2px solid gray;"> <br>
    //   <input type="password" id="password" placeholder="New Password" style="margin-bottom: 20px;border-radius: 8px;padding: 5px 20px;width: 75%;border: 2px solid gray;"><br>
    //   <input type="text" id="cpass" placeholder="Confirm Password" style="margin-bottom: 20px;border-radius: 8px;padding: 5px 20px;width: 75%;border: 2px solid gray;">`,
    //   confirmButtonText:'Change'
      
    // })
    // .then((resp)=>{
    //   if(resp.isConfirmed){
    //     const otp = document.getElementById('otp');
    //     const password = document.getElementById('password');
    //     const cpass = document.getElementById('cpass');
    //     // if(password !== cpass)
    //     console.log(otp.value,password.value,cpass.value);
        
    //   }

    // })
    return;
    this._registerdetails.findEmail({useremail:val.forgotemail}).subscribe({
      next:(res:any)=>{
        // console.log(res);
        
      },
      error:(err)=>{
        // this.toastr.error(err.error.message)
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
