import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications`;

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
   * Get all notifications for current user
   */
  getMyNotifications(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get unread notifications count
   */
  getUnreadCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/unread-count`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Mark notification as read
   */
  markAsRead(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/read`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Mark all notifications as read
   */
  markAllAsRead(): Observable<any> {
    return this.http.put(`${this.apiUrl}/mark-all-read`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete notification
   */
  deleteNotification(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete all notifications
   */
  deleteAllNotifications(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-all`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get notifications by type
   */
  getNotificationsByType(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/type/${type}`, {
      headers: this.getHeaders()
    });
  }
}
