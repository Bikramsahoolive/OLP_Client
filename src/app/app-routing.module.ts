import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';
import { HomeComponent } from './after-login-user/home/home.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
 
  {path:'userDashboard',loadChildren:()=>import('./after-login-user/after-login-user.module').then(m=>m.AfterLoginUserModule)},
  {path:'createrDashboard',loadChildren:()=>import('./after-login-creater/after-login-creater.module').then(m=>m.AfterLoginCreaterModule)},
  {path:'auth',loadChildren: ()=> import('./before-login/before-login.module').then(m=> m.BeforeLoginModule)},
  {path:'google-auth/:token',component:GoogleAuthComponent},
  {path:'', component:LandingComponent},
  {path:'**', component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
