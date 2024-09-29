import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleCourseComponent } from './single-course/single-course.component';
import { EnrollCoursesPageComponent } from './enroll-courses-page/enroll-courses-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LearningPageComponent } from './learning-page/learning-page.component';
import { userGuardGuard } from '../Guards/user-guard.guard';
import { CertificateComponent } from './certificate/certificate.component';

const routes: Routes = [
  {
    path:'',component:DashboardComponent,canActivate:[userGuardGuard],
    children:[
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', component: HomeComponent,canActivate:[userGuardGuard] },
      {path:'single-course-page/:id',component:SingleCourseComponent,canActivate:[userGuardGuard]},
      {path:'enrolled-courses',component:EnrollCoursesPageComponent,canActivate:[userGuardGuard]},
      {path:'certificate/:id',component:CertificateComponent,canActivate:[userGuardGuard]},
      {path:'enrolled-courses/:id',component:LearningPageComponent,canActivate:[userGuardGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfterLoginUserRoutingModule { }
