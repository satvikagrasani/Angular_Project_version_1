import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Subscription, catchError, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editemp',
  templateUrl: './editemp.component.html',
  styleUrls: ['./editemp.component.css']
})
export class EditempComponent implements OnInit, OnDestroy {
  form: FormGroup;
  employees: any[] = [];
  private EmployeeSubscription: Subscription | undefined;
  Id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute here
  ) {
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

  
  updateEmployee() {
    if (this.form.valid) {
      const updatedEmployeeData = this.form.value;
      // Ensure that you have the employee's unique identifier (e.g., Id) for updating
      if (this.Id !== null) {
        this.EmployeeSubscription = this.employeeService.updateEmployee(this.Id, updatedEmployeeData)
          .subscribe({
            next: (response) => {
              console.log('Employee updated:', response);
              window.alert("Employee Updated Successfully");
              this.router.navigate(['']);
            },
            error: (error) => {
              console.error('Error updating Employee:', error);
              
            }
          });
      }
    }
  }
  
  clearForm() {
    this.form.reset();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id) && id > 0) {
        this.Id = id;
        this.loadEmployees(id);
      } else {
        this.router.navigate(['/user-list']);
      }
    });
  }

  loadEmployees(Id: number) {
    this.employeeService.getEmployees()
      .pipe(
        catchError(error => {
          console.error('Error fetching user:', error);
          return throwError(() => error); // Use a factory function to create the error
        })
      )
      .subscribe(employees => {
        const employee = employees.find((e: any) => e.id === Id);
        if (employee) {
          this.form.patchValue({ ...employee }); // Patch user data to the form
        }
      });
  }

  ngOnDestroy() {
    if (this.EmployeeSubscription) {
      this.EmployeeSubscription.unsubscribe();
    }
  }
}
