import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.loginService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Get all users (Admin only)
   */
  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get user by ID
   */
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get current user profile
   */
  getMyProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update user
   */
  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update my profile
   */
  updateMyProfile(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, userData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete user
   */
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Change password
   */
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, 
      { oldPassword, newPassword }, 
      { headers: this.getHeaders() }
    );
  }

  /**
   * Update profile picture
   */
  updateProfilePicture(formData: FormData): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // Don't set Content-Type, let the browser set it with boundary
    });
    
    return this.http.put(`${this.apiUrl}/profile/picture`, formData, {
      headers
    });
  }

  /**
   * Delete profile picture
   */
  deleteProfilePicture(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/profile/picture`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get user statistics
   */
  getUserStatistics(userId?: string): Observable<any> {
    const url = userId ? `${this.apiUrl}/${userId}/statistics` : `${this.apiUrl}/statistics`;
    return this.http.get(url, {
      headers: this.getHeaders()
    });
  }
}
