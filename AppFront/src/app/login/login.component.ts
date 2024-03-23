import { Component , OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

constructor(private authService: AuthService , private storageService:TokenStorageService ,private router:Router){}
user ={
  username:'',
  password:''
}
isLoggedIn = false;
isLoginFailed = false;
errorMessage = '';
roles: string[] = [];
ngOnInit(): void {
      
}
  login(){
   const user = this.user;
   this.authService.login(this.user).subscribe({
    next : data =>{
      console.log(data)
      this.storageService.saveUser(data);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
    //  this.roles = this.storageService.getUser().roles; 
     },
    error: err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
  });
}
}

      
 