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
          const startDateTime = new Date(l.startTime);
          const endDateTime = new Date(l.endTime);
          const formattedStartTime = startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
          const formattedEndTime = endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
          
          this.Events.push({
            title: `${l.meetingRoom.name} (${formattedStartTime} - ${formattedEndTime})`,
            start: l.startTime,
            end: l.endTime,
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