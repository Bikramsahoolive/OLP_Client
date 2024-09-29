import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfterLoginCreaterRoutingModule } from './after-login-creater-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AddCoursesComponent } from './nav-links/add-courses/add-courses.component';
import { HelpComponent } from './nav-links/help/help.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './nav-links/home/home.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    AddCoursesComponent,
    HelpComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AfterLoginCreaterRoutingModule,
    ReactiveFormsModule
  ]
})
export class AfterLoginCreaterModule { }
