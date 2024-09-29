import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sideNavWidth=0;
  openNav() {
   this.sideNavWidth = 250; 
  }
  
  closeNav() {
    this.sideNavWidth = 0; 
  }
}
