import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { RoomService } from 'src/app/services/room.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-reservation',
  templateUrl: './ajouter-reservation.component.html',
  styleUrls: ['./ajouter-reservation.component.css']
})
export class AjouterReservationComponent implements OnInit{
  constructor(private route:ActivatedRoute,private  _reserv:ReservationService, private  _room:RoomService ,private storageService:TokenStorageService , private router : Router){}
  Reservation={
    user:'',
    meetingRoom:'',
    startTime:'',
    endTime:''

  }
  meeting:any
 
  ngOnInit(): void {
    this.meeting = this.route.snapshot.paramMap.get('id');
    this.Reservation.meetingRoom = this.meeting;
    const user2 = this.storageService.getUserData();
    this.Reservation.user = user2._id;
  }

  Reserver() {
    console.log(this.Reservation);
    this._reserv.ajouter(this.Reservation).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Reservation Successful',
          text: 'Your reservation has been successfully .',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/dashboardus/listreservation']);
        });
      },
      (err) => {
        console.log(err);
        if (err.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Reservation Error',
            text: 'The meeting room is already booked for the selected time. Please choose a different time .',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Reservation Error',
            text: 'An error occurred while making the reservation. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }
}