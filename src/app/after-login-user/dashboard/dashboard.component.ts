import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/Services/authentication/register.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router:Router,private auth : RegisterService) {
  }

  goTo(str:string,dropdown:any){
    this.router.navigate([str])
    if(dropdown!==''){
      dropdown.classList.remove('show');
      this.open = false;
    }
  }
  logout(){
    this.auth.logout();
  }
open:boolean=false;
  toggle(dropdown:any){
    this.open = !this.open;
    if(this.open){
      dropdown.classList.add('show');
    }else{
      dropdown.classList.remove('show');
    }
  }
}
