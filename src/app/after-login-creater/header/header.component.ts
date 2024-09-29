import { Component } from '@angular/core';
import { RegisterService } from 'src/app/Services/authentication/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  username:string ='';

  constructor( private auth:RegisterService){}
  ngOnInit(){
    let user:any = localStorage.getItem('sid')||'';
    user = JSON.parse(atob(user));
    this.username= `${user.username}`;
  }

  signOut(){
    this.auth.logout();
    }
}
