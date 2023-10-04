import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  employees: any[] = [];
  private EmployeeSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) {
    this.form = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[A-Z][a-zA-Z]*$/)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^[A-Z][a-zA-Z]*$/)
        ]
      ],
      contactNo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{1,10}$/)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
        ]
      ],
      dob: [''],
      address: ['']
    });
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get contactNo() {
    return this.form.get('contactNo');
  }

  get email() {
    return this.form.get('email');
  }

  addEmployee() {
    const newEmployeeData = this.form.value;
    this.EmployeeSubscription = this.employeeService.addEmployee(newEmployeeData).subscribe({
      next: (response) => {
        console.log('Employee added:', response);
        this.clearForm();
        window.alert("Employee Added Successfully");
        this.loadEmployees();
      },
      error: (error) => {
        console.error('Error adding Employee:', error);
      }
    });
  }

  clearForm() {
    this.form.reset();
  }

  ngOnInit() {
    console.log('EmployeeComponent initialized');
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((response: any) => {
      this.employees = response;
    });
  }

  deleteEmployee(Id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.employeeService.deleteEmployee(Id)
        .subscribe(() => {
          // Reload the user list after successful deletion
          this.loadEmployees();
        });
    }
  }

  ngOnDestroy() {
    if (this.EmployeeSubscription) {
      this.EmployeeSubscription.unsubscribe();
    }
  }
}
