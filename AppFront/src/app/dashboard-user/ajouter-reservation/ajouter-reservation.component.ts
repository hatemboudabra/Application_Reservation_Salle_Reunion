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

  validateReservation(): boolean {
    const start = new Date(this.Reservation.startTime);
    const end = new Date(this.Reservation.endTime);
  
    if (start.getFullYear() > end.getFullYear()) {
      return false;
    } else if (start.getFullYear() === end.getFullYear() && start.getMonth() > end.getMonth()) {
      return false;
    } else if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() >= end.getDate()) {
      return false;
    }
  
    return true;
  }

  Reserver() {
    if (this.validateReservation()) {
      console.log(this.Reservation);
      this.addReservation();
    } else {
      this.showInvalidReservationAlert();
    }
  }

  addReservation() {
    this._reserv.ajouter(this.Reservation).subscribe(
      (res) => {
        console.log(res);
        this.showSuccessAlert();
      },
      (err) => {
        console.log(err);
        if (err.status === 400) {
          this.showRoomBookedAlert();
        } else {
          this.showReservationErrorAlert();
        }
      }
    );
  }

  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Reservation Successful',
      text: 'Your reservation has been successfully .',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/dashboardus/listreservation']);
    });
  }

  showRoomBookedAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Reservation Error',
      text: 'The meeting room is already booked for the selected time. Please choose a different time .',
      confirmButtonText: 'OK'
    });
  }

  showReservationErrorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Reservation Error',
      text: 'An error occurred while making the reservation. Please try again.',
      confirmButtonText: 'OK'
    });
  }

  showInvalidReservationAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Reservation',
      text: 'End time must be after start time. Please choose a valid time range.',
      confirmButtonText: 'OK'
    });
  }
}
