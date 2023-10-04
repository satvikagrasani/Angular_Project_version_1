import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  
  Id = localStorage.getItem('ID');
  firstName = localStorage.getItem('firstName');
  lastName = localStorage.getItem('lastName');
  contactNo = localStorage.getItem('contactNo');
  email = localStorage.getItem('email');
  dob = localStorage.getItem('dob');
  address = localStorage.getItem('address');

  constructor(private authService : AuthService, private router: Router){}

    logout() {
    if(confirm("Do you want to Logout ?")){
      this.authService.logout();
      this.router.navigate(['login']);
    }
  }
}