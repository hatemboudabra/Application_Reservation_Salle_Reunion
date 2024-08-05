import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:5000/auth';
    register(user:any){
    return this.http.post(this.apiUrl+'register',user,{ responseType: 'text' });
  }
  login(user:any){
    return this.http.post(this.apiUrl+'login',user);
  }
  getrole(id : any){
    return this.http.get(this.apiUrl+id)
  }
  logout() :void{
    localStorage.removeItem('token');
  }
  getall(){
    return this.http.get(this.apiUrl+'all');
  }
  supprimer(id:any){
    return this.http.delete(this.apiUrl+id);
  }
  userbyid(id:any){
    return this.http.get(this.apiUrl+'userbyid/'+id)
  }

}
