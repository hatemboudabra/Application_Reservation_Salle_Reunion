import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { RoomService } from 'src/app/services/room.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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
    this.meeting=this.route.snapshot.paramMap.get('id');
    this.Reservation.meetingRoom=this.meeting;
    const user2 =this.storageService.getUserData();
     this.Reservation.user = user2._id;
  }
Reserver(){
  console.log(this.Reservation);
  this._reserv.ajouter(this.Reservation).subscribe(
    ( res)=>{
       console.log(res);
       this.router.navigate(['/dashboardus/listreservation'])

     },
     err=>{
       console.log(err);

     }
   )

}
}
