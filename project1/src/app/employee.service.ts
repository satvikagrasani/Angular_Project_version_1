import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) {}

  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }

  getEmployees(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteEmployee(Id: number): Observable<any> {
    const url = `${this.apiUrl}/${Id}`;
    return this.http.delete(url);
  }

  updateEmployee(Id: number, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${Id}`, employee);
  }
  
}  