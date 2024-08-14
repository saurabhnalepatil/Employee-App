import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7241/api/Employee';
  private jsonApiURL = 'http://localhost:3000/user'
  constructor(private http: HttpClient) { }

  getAllEmployees() {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  updateEmployee(employee: Employee) {
    return this.http.put(`${this.apiUrl}/${employee.id}`, employee)
  }
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.jsonApiURL)
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.jsonApiURL, user);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.jsonApiURL}/${user.id}`, user)
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.jsonApiURL}/${id}`);
  }

}
