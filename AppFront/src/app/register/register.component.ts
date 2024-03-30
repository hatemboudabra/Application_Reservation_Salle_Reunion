import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService ) { }
  ngOnInit(): void {
    
  } 
  user ={
    username:'',
    email : '',
    password:''
  }
 
register(){
  console.log(this.user)
  this.authService.register(this.user).subscribe({
    next: data => {
      console.log(data);
      
    },
      error : err=>{
        console.log(err);
      }
  
  })

}

}
