import { Component,ViewChild,ElementRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RegisterService } from 'src/app/Services/authentication/register.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  activeColor:string='orange';
  text:string='white';
  @ViewChild('home',{static:true})home!:ElementRef;
  @ViewChild('course',{static:true})course!:ElementRef;
  @ViewChild('help',{static:true})help!:ElementRef;
  @ViewChild('sidenav',{static:true})sidenav!:ElementRef;
  constructor(private router:Router, private auth:RegisterService,private route:ActivatedRoute) {}
  
  goTo(str:string,tag:string){
    this.toogle();
    this.home.nativeElement.classList .remove('active');
      this.course.nativeElement.classList.remove('active');
      this.help.nativeElement.classList.remove('active');
    if(tag =='home'){
      this.home.nativeElement.classList .add('active');
    }else if(tag == 'course'){
      this.course.nativeElement.classList.add('active');
    }else if(tag == 'help'){
      this.help.nativeElement.classList.add('active');
    }
    this.router.navigate([str])
  }

sidenavShow :boolean = true;
  toogle(){
    this.sidenavShow = !this.sidenavShow;
    if(this.sidenavShow){
      this.sidenav.nativeElement.classList.add('hide');
    }else{
      this.sidenav.nativeElement.classList.remove('hide');
    }
    
  }
}
