import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoursesService } from 'src/app/Services/courses.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  constructor(private router:ActivatedRoute, private courseServ : CoursesService,private spinner:NgxSpinnerService){}
id:any;
certificateData:any={};
  ngOnInit(){
    this.spinner.show();
    this.router.params.subscribe(params => {
      this.id = params['id'];
      this.courseServ.downloadCertificate(this.id).subscribe({
        next:(res)=>{
          console.log(res);
          this.spinner.hide();
          this.certificateData = res;
          setTimeout(()=>{window.print();},1000);
          
          
        },error:(err)=>{
          console.log(err.error);
          
        }
      })
      
    });
  }
}
