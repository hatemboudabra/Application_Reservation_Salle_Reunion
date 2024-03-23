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
token : any;
//tokenetudiant : any;
ngOnInit(): void {
      
}
  login(){
   const {username , password} = this.user;
   this.authService.login(this.user).subscribe({
    
   })
   
      
 

 

}
}