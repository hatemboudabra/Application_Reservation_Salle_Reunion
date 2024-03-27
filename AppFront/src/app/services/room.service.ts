import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor( private http : HttpClient) { }
  private  url = 'http://localhost:5000/meetingRoom/';
  ajouter(meetingRoom : any){
    return this.http.post(this.url+'ajouter',meetingRoom);
  }
  getall(){
    return this.http.get(this.url+'all');
  }
  modifier(id : any , meetingRoom : any){
    return this.http.put(this.url+id,meetingRoom);
  }
  supprimer(id:any){
    return this.http.delete(this.url+id);
  }
}
