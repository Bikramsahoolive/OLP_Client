import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCoursesComponent } from './nav-links/add-courses/add-courses.component';
import { HelpComponent } from './nav-links/help/help.component';
import { HomeComponent } from './nav-links/home/home.component';
import { creatorGuardGuard } from '../Guards/creator-guard.guard';

const routes: Routes = [
  {
  path: '', component:DashboardComponent,canActivate:[creatorGuardGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent,canActivate:[creatorGuardGuard] },
      { path: 'add-courses', component: AddCoursesComponent,canActivate:[creatorGuardGuard] },
      { path: 'help', component: HelpComponent,canActivate:[creatorGuardGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfterLoginCreaterRoutingModule { }
