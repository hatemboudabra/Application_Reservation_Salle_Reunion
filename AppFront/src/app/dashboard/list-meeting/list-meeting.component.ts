import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.css']
})
export class ListMeetingComponent  implements OnInit{

  constructor( private  _list:RoomService , private router: Router){}
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
