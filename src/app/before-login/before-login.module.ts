import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BeforeLoginRoutingModule } from './before-login-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordfieldComponent } from './pages/passwordfield/passwordfield.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordfieldComponent,
    ForgotpasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BeforeLoginRoutingModule,
    ToastrModule.forRoot({ // Configure toastr options here
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ]
})
export class BeforeLoginModule { }
