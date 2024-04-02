import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor( private http : HttpClient , private router:Router) { }
  public  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
 
   private  url = 'http://localhost:5000/reservation/';
   ajouter(Reservation : any){
     return this.http.post(this.url+'ajouter',Reservation,{ headers: this.headers });
   }
   getall(){
     return this.http.get(this.url+'all',{ headers: this.headers });
   }
   getbyidUser(id:any){
    return this.http.get(this.url+'getreservationbyiduser/'+id,{ headers: this.headers });
   }
}
