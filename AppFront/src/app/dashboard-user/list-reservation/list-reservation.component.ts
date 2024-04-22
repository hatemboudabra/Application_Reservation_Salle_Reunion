import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent implements OnInit {
  constructor( private  _reservation:ReservationService ,private storageService:TokenStorageService){}
  Events: any[] = [];
  reservation:any;
   color:any
  ngOnInit(): void {
    const user2 = this.storageService.getUserData();
    console.log(user2);
    const id = user2._id;
    this._reservation.getbyidUser(id).subscribe({
      next: (data) => {
        this.reservation = data;
        console.log(this.reservation);

        for (let l of this.reservation) {
          if (l.confirmed == false) {
            this.color = 'red';
          } else {
            this.color = 'color';
          }

        
          this.Events.push({
            start: l.startTime,
            end: l.endTime,
            title:l.meetingRoom.name,
            backgroundColor: this.color
          });
        }
        this.calendarOptions.events = this.Events;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    themeSystem: 'bootstrap'
  };
}