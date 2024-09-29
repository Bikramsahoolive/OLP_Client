import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  constructor(private http : HttpClient,private router : Router) { }

 addRegistration ( data: any): Observable <any> {
  const headers = new HttpHeaders({'content-type':"application/json"})
    return this.http.post('http://localhost:3001/users/',data,{headers:headers});
 }

 getRegistration(data:any): Observable<any> {
  return this.http.post('https://c8bltjmv-3000.inc1.devtunnels.ms/auth/register',data);
 }

 loginUser(data:any){
  const headers = new HttpHeaders({'content-type':"application/json"});
  return this.http.post(`https://c8bltjmv-3000.inc1.devtunnels.ms/auth/login`,data, {
    headers: headers,
    withCredentials: true 
  }) 
 }

 loginWithGoogleUser(data:any){
  const headers = new HttpHeaders({'content-type':"application/json"});
  return this.http.post(`https://c8bltjmv-3000.inc1.devtunnels.ms/auth/google-login`,data, {
    headers: headers,
    withCredentials: true 
  }) 
 }

 checkSession(){
  const headers = new HttpHeaders({'content-type':"application/json"});
  this.http.get(`https://c8bltjmv-3000.inc1.devtunnels.ms/auth/check-session`, {
    headers: headers,
    withCredentials: true 
  })
  .subscribe({
    next:(res)=>{   
      // console.log(res);
      const sid = btoa(JSON.stringify(res));
      localStorage.setItem('sid',sid);
    },error:(err)=>{
      console.log(err.error);
      localStorage.removeItem('sid');
      this.router.navigate(['/auth/login'])
      
    }
  })
 }

 updatePassword(data:any,id:any): Observable <any>{
  const headers = new HttpHeaders({'content-type':"application/json"})
  return this.http.patch(`https://c8bltjmv-3000.inc1.devtunnels.ms/auth/verify`,data,{headers:headers})
 }

 findEmail(data:any){
  const headers = new HttpHeaders({'content-type':"application/json"})
  return this.http.post(`https://c8bltjmv-3000.inc1.devtunnels.ms/auth/verify`,data,{headers:headers})
 }

 logout(){
  localStorage.removeItem('sid');
    this.router.navigate(['/auth/login']);
    
    const Toast = Swal.mixin({
      toast: true,
      position:'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Logout successfully"
    });

  const headers = new HttpHeaders({'content-type':"application/json"});
  this.http.post(`https://c8bltjmv-3000.inc1.devtunnels.ms/auth/logout`, {},{
    headers: headers,
    withCredentials: true 
  }).subscribe({
    next:(res)=>{
      // console.log(res);
      
    },error:(err)=>{
      
      console.log(err.error);
      
    }
  })
 }

}
