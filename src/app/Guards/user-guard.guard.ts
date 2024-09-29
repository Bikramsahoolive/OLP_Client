import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import {RegisterService} from '../Services/authentication/register.service';
export const userGuardGuard: CanActivateFn = (route, state) => {
  const authServ = inject(RegisterService);

  authServ.checkSession();
  
  let sid:any = localStorage.getItem('sid');
   sid = JSON.parse(atob(sid));
  
  if(sid){
    return true;
  }
    return false;
};
