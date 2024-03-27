import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor( private http : HttpClient , private router:Router) { }
 public  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  private  url = 'http://localhost:5000/meetingRoom/';
  ajouter(meetingRoom : any){
    return this.http.post(this.url+'ajouter',meetingRoom,{ headers: this.headers });
  }
  getall(){
    return this.http.get(this.url+'all');
  }
  modifier(id : any , meetingRoom : any){
    return this.http.put(this.url+id,meetingRoom);
  }
  supprimer(id:any){
    return this.http.delete(this.url+id,{ headers: this.headers });
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }
  getallRoom(): Observable<any> {
    if (!this.isLoggedIn()) {
      return  of(null);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any[]>(`${this.url}/all`, { headers });
  }


}

