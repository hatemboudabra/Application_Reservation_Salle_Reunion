import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.css']
})
export class NavbaruserComponent {
  constructor(private router: Router , private auth : AuthService) { }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear(); 
    this.auth.logout()
        this.router.navigate(['login']); 
  
}
}
