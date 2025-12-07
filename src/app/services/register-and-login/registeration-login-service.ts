import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterationLoginService {
  
  private apiUrl = 'http://localhost:3000/Freelancing/api/v1'; // replace with your backend

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    // Send all the registration fields to the backend
    return this.http.post(`${this.apiUrl}/users/register`, userData);
  }
}
