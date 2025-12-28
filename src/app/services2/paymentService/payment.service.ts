import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

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
   * Get all payments (Admin only)
   */
  getAllPayments(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get payment by ID
   */
  getPaymentById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get my payments (as payer or payee)
   */
  getMyPayments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mine`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Create new payment
   */
  createPayment(paymentData: any): Observable<any> {
    return this.http.post(this.apiUrl, paymentData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Process payment (mock gateway)
   */
  processPayment(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/process`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Refund payment
   */
  refundPayment(id: string, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/refund`, { reason }, {
      headers: this.getHeaders()
    });
  }

  /**
   * Cancel payment
   */
  cancelPayment(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/cancel`, {}, {
      headers: this.getHeaders()
    });
  }
}
