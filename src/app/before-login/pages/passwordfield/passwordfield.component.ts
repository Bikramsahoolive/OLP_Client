import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/Services/authentication/register.service';


@Component({
  selector: 'app-passwordfield',
  templateUrl: './passwordfield.component.html',
  styleUrls: ['./passwordfield.component.scss']
})

export class PasswordfieldComponent {
  newpass: string = ''
  id: any
  emailid: any
  passwordReset: FormGroup
  constructor(private router: Router, private route: ActivatedRoute, private updatepass: RegisterService, private _passworddetails: FormBuilder) {
    this.passwordReset = this._passworddetails.group({
      newpassword: ['', [Validators.required]],
      confnewpassword: ['', [Validators.required]]
    })
    this.route.queryParamMap.subscribe((p: any) => {

      this.id = p['params']
      // console.log(this.id.id)
    })
    // this.updatepass.getRegistration().subscribe({
    //   next:(res)=>{
    //     res.forEach((element:any)=>{
    //      //why is this id undefined :(
    //       // we need to find the id from email id
    //       if(element.useremail == this.emailid){
    //         this.id = element.id
    //       }
    //     })
    //     // console.log(this.id)
    //   }

    // })
  }

  get Passwordfield() {
    return this.passwordReset.get('newpassword')
  }
  get confpasswordfield() {
    return this.passwordReset.get('confnewpassword')
  }

  submitNewPassword(value: any) {
    if (value.newpassword == value.confnewpassword) {
    const  data = {
      newpassword: value.newpassword
      }
      console.log(data,this.id.id)
      this.updatepass.updatePassword(data, this.id.id).subscribe({
        next: () => {
          // this.toaster.success("Password updated successfully")
          this.router.navigate(['/login'])
        },
        error:(err)=>{
          // this.toaster.error(err)
          console.log(err)
        }
      })
    }
    else {
      // this.toaster.error("Password does not match")
    }
  }

  navigatetoemail() {
    this.router.navigate(['/forgot-password'])
  }
}

