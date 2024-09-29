import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfterLoginUserRoutingModule } from './after-login-user-routing.module';
import { HomeComponent } from './home/home.component';
import { SingleCourseComponent } from './single-course/single-course.component';
import { EnrollCoursesPageComponent } from './enroll-courses-page/enroll-courses-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LearningPageComponent } from './learning-page/learning-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CertificateComponent } from './certificate/certificate.component'; 


@NgModule({
  declarations: [
    HomeComponent,
    SingleCourseComponent,
    EnrollCoursesPageComponent,
    DashboardComponent,
    LearningPageComponent,
    CertificateComponent
  ],
  imports: [
    CommonModule,
    AfterLoginUserRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class AfterLoginUserModule { }
