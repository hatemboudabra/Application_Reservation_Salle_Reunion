import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list-meetingus',
  templateUrl: './list-meetingus.component.html',
  styleUrls: ['./list-meetingus.component.css']
})
export class ListMeetingusComponent  implements OnInit{
  public url='http://localhost:5000/'
   constructor( private  _list:RoomService ,private storageService:TokenStorageService, private router: Router){}
     meetingroom : any ;
  
   ngOnInit(): void {
  
     
     this._list.getall().subscribe({
 
         next : data =>{
           this.meetingroom = data;
           console.log(data);
         },
         error: err => {
           console.log(err);
         }
       })
       
   }

  
  
 }
 