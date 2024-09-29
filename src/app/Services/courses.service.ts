import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http : HttpClient) { }

   getAllCourse ( ) {
    const headers = new HttpHeaders({'content-type':"application/json"})
      return this.http.get('https://c8bltjmv-3000.inc1.devtunnels.ms/student/courses',{headers:headers,withCredentials:true});
   }

   getCourses ( ) {
    const headers = new HttpHeaders({'content-type':"application/json"})
      return this.http.get('https://c8bltjmv-3000.inc1.devtunnels.ms/courses',{headers:headers});
   }

   getOneCourse (id:number ) {
    const headers = new HttpHeaders({'content-type':"application/json"})
      return this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/courses/${id}`,{headers:headers,withCredentials:true});
   }

   getQuizzes(id:number){
    const headers = new HttpHeaders({'content-type':"application/json"})
    return this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/courses/quizes/${id}`,{headers:headers,withCredentials:true});
   }

   getAssignments(id:number){
    const headers = new HttpHeaders({'content-type':"application/json"})
    return this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/courses/assignments/${id}`,{headers:headers,withCredentials:true});
   }

   enrollCourse(id:number){
    const headers = new HttpHeaders({'content-type':"application/json"})
    return this.http.post(`https://c8bltjmv-3000.inc1.devtunnels.ms/student/enroll/${id}`,{},{headers:headers,withCredentials:true});
   }

   unenrollCourse(id:number){
    const headers = new HttpHeaders({'content-type':"application/json"})
    return this.http.delete(`https://c8bltjmv-3000.inc1.devtunnels.ms/student/unenroll/${id}`,{headers:headers,withCredentials:true});
   }

   getenrollCourses(){
    const headers = new HttpHeaders({'content-type':"application/json"})
    return this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/student/enrolled-courses`,{headers:headers,withCredentials:true});
   }

   getProgress (id:number ) {
    const headers = new HttpHeaders({'content-type':"application/json"})
      return this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/student/progress/${id}`,{headers:headers,withCredentials:true});
   }

   completeLearning (id:number ) {
    const headers = new HttpHeaders({'content-type':"application/json"})
      return this.http.patch(`https://c8bltjmv-3000.inc1.devtunnels.ms/student/complete-learning/${id}`,{},{headers:headers,withCredentials:true});
   }

   completeQuiz (id:number,data:any ) {
    const headers = new HttpHeaders({'content-type':"application/json"})
      return this.http.patch(`https://c8bltjmv-3000.inc1.devtunnels.ms/student/complete-quiz/${id}`,data,{headers:headers,withCredentials:true});
   }

   completeAssignment (id:number,data:any ) {
    const headers = new HttpHeaders({'content-type':"application/json"})
      return this.http.patch(`https://c8bltjmv-3000.inc1.devtunnels.ms/student/complete-assignment/${id}`,data,{headers:headers,withCredentials:true});
   }

   downloadCertificate (id:number ) {
    const headers = new HttpHeaders({'content-type':"application/json"})
      return this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/student/certificate/${id}`,{headers:headers,withCredentials:true});
   }
   
}
