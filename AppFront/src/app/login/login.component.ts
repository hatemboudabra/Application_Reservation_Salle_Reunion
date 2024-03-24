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
token :any
 role : any;
ngOnInit(): void {
      
}
  login(){
   const user = this.user;
   this.authService.login(this.user).subscribe({
    next : data =>{
      console.log(data)
      //this.storageService.saveUser(data);
      this.token= data;
        localStorage.setItem('token',this.token.token);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
       const user2 =this.storageService.getUserData();
       const id = user2._id;
       console.log(id)
      this.authService.getrole(id).subscribe(
        (response : any)=>{
           this.role = response.role;
          console.log(this.role);
          if(this.role == 'User'){
              this.router.navigate(['/dashboardus'])
          }
          else{
            this.router.navigate(['/dashboard'])
          }
        },
        (error)=>{
          console.log(error);
        }
        
        )
     //const user1 =  this.storageService.getUser().roles;
    // console.log("hhh123"+user1);
    //  this.roles = this.storageService.getUser().roles; 
     },
    error: err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
  });
}

}

      
 