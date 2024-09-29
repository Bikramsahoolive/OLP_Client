import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})

export class AuthService {

   isUserLoggedIn: boolean = false;

   getToken() {
      return localStorage.getItem('token')
   }
   isLoggedIn(): boolean {
      return !!localStorage.getItem('token')
   }
   
   logout(): void {
      this.isUserLoggedIn = false;
      localStorage.clear();
   }


}
