import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listemp',
  templateUrl: './listemp.component.html',
  styleUrls: ['./listemp.component.css']
})
export class ListempComponent implements OnInit, OnDestroy {

  employees: any[] = [];
  private EmployeeSubscription: Subscription | undefined;
  constructor(private employeeService: EmployeeService){}
  
  ngOnInit() {
    console.log('EmployeeComponent initialized');
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((response: any) => {
      this.employees = response;
    });
  }

  ngOnDestroy() {
    if (this.EmployeeSubscription) {
      this.EmployeeSubscription.unsubscribe();
    }
  }
}

