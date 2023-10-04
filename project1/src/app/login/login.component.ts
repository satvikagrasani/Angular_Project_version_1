import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  searchId: number | undefined;
  employeeInfo: any | undefined;
  error: string | undefined;
  result: boolean | undefined;
  searchDOB: string | undefined;
  token = 'token';
  formData: FormGroup;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder, private http: HttpClient, private router: Router){
    this.formData = this.fb.group({
      username: [
        '',
        [
          Validators.required
        ]
      ],
      password: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  onSubmit(){
    window.alert("Logged IN");

    if (this.searchId === undefined || isNaN(this.searchId)) {
      this.employeeInfo = undefined;
      this.error = "Invalid ID";
      return;
    }

    // Make an HTTP GET request to the specified URL
    this.http.get<any[]>('http://localhost:3000/employee').subscribe({
      next: (data) => {
        console.log("id DOB", this.searchId, this.searchDOB)
        // Find the user with the matching ID in the response data
        const foundUser = data.find((users: any) => users.id == this.searchId);

        if (foundUser) {
          this.employeeInfo = foundUser;
          this.error = undefined;

          // Extract information from the found user
          const { dob, id, firstName, lastName, address, email, contactNo } = foundUser;
          console.log("DOB of", firstName, "is", dob);
          console.log("Id is ", id)
          console.log('Response Data:', data);

          // Set the 'result' variable based on whether a user was found
          this.result = true;
          console.log('login Info ', this.employeeInfo);
       
          console.log(this.result);

          // Check if the entered 'searchAddress' matches the found user's address
          if (this.searchDOB === dob) {
            console.log("Login successful");
            localStorage.setItem("ID", id);
            localStorage.setItem("firstName", firstName)
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("address", address);
            localStorage.setItem('contactNo', contactNo);
            localStorage.setItem("dob", dob);
            localStorage.setItem("email", email);
            //window.location.href = window.location.href;
            localStorage.setItem('token', this.token);
            
            // window.location.href = '/welcome';
            this.router.navigate(['welcome']);
         
          } else {
            console.log("Login unsuccessful");
          }
        } else {
          // User not found
          this.employeeInfo = undefined;
          this.error = "User not found";
        }
      },
      error: (error) => {
        console.error('Error:', error);
        this.employeeInfo = undefined;
        this.error = "Error fetching user data";
      },
    });
  }
}
