import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private token : TokenStorageService , private router : Router){}
  canActivate() {
    if (this.token.isLoggedIn() == true) {
      return true;
    }else{
      this.router.navigate(['/login']);                                
    
      return false;
    }
  }
}
