import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private toaster:ToastrService){}
  subscribe(){
this.toaster.success("Subscribed to newsletters")
  }
}
