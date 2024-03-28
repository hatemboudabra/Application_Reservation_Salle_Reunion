import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.css']
})
export class ListMeetingComponent  implements OnInit{
 public url='http://localhost:5000/'
  constructor( private  _list:RoomService ,private storageService:TokenStorageService, private router: Router){}
    meetingroom : any ;
    
  ngOnInit(): void {
    const user2 =this.storageService.getUserData();
    console.log(user2)
    const id = user2._id;
    this._list.roombyiduser(id).subscribe({

        next : data =>{
          this.meetingroom = data;
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      })
      
  }
  deleteRoom(id: any): void {
    this._list.supprimer(id).subscribe(
      () => {
        console.log('Room deleted successfully.');
        // Update the meeting room list after deletion
        this.meetingroom = this.meetingroom.filter((room: any) => room.id !== id);
        this.ngOnInit();
      },
      error => {
        console.log('Error deleting room:', error);
      }
    );
  }

}
