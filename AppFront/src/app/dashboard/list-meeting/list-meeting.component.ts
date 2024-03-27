import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.css']
})
export class ListMeetingComponent  implements OnInit{
 
  constructor( private  _list:RoomService , private router: Router){}
    meetingroom : any ;
    
  ngOnInit(): void {
      this._list.getallRoom().subscribe({
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
