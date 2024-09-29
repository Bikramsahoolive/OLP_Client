import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreterServicesService {

  constructor(private http : HttpClient) { }

  addCourse ( data: any) {
    const headers = new HttpHeaders({'content-type':"application/json"})
      return this.http.post('https://c8bltjmv-3000.inc1.devtunnels.ms/creator/add-course',data,{headers:headers,withCredentials:true});
   }

   allCourses ( ) {
    const headers = new HttpHeaders({'content-type':"application/json"})
      return this.http.get('https://c8bltjmv-3000.inc1.devtunnels.ms/creator/courses',{headers:headers,withCredentials:true});
   }

   deleteOneCourse ( id:number) {
    const headers = new HttpHeaders({'content-type':"application/json"})
      return this.http.delete(`https://c8bltjmv-3000.inc1.devtunnels.ms/creator/course/${id}`,{headers:headers,withCredentials:true});
   }


}
