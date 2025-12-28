import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/reviews`;

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
   * Get all reviews (Admin only)
   */
  getAllReviews(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get review by ID
   */
  getReviewById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get reviews by reviewer ID
   */
  getReviewsByReviewer(reviewerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviewer/${reviewerId}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get reviews by reviewee ID (reviews received by a user)
   */
  getReviewsByReviewee(revieweeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviewee/${revieweeId}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get reviews by contract ID
   */
  getReviewsByContract(contractId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/contract/${contractId}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Create new review
   */
  createReview(reviewData: any): Observable<any> {
    return this.http.post(this.apiUrl, reviewData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update review
   */
  updateReview(id: string, reviewData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reviewData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete review
   */
  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
