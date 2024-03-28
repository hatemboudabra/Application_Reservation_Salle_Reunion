import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  public url='http://localhost:5000/'
  constructor( private user: AuthService , private router : Router){}
  userList : any;
ngOnInit(): void {
    this.user.getall().subscribe({
      next : data =>{
        this.userList = data;
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    })
  
}
}
