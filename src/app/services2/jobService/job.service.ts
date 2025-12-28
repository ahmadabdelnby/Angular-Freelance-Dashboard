import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = `${environment.apiUrl}/jobs`;

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
   * Get all jobs
   */
  getAllJobs(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get job by ID
   */
  getJobById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Search jobs with filters
   */
  searchJobs(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, {
      params,
      headers: this.getHeaders()
    });
  }

  /**
   * Create new job
   */
  createJob(jobData: any): Observable<any> {
    return this.http.post(this.apiUrl, jobData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update job
   */
  updateJob(id: string, jobData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, jobData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete job
   */
  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get jobs by client
   */
  getJobsByClient(clientId?: string): Observable<any> {
    const url = clientId ? `${this.apiUrl}/client/${clientId}` : `${this.apiUrl}/my`;
    return this.http.get(url, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get featured jobs
   */
  getFeaturedJobs(limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/featured`, {
      params: { limit: limit.toString() },
      headers: this.getHeaders()
    });
  }

  /**
   * Close job
   */
  closeJob(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/close`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Reopen job
   */
  reopenJob(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/reopen`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Increment job views
   */
  incrementViews(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/view`, {}, {
      headers: this.getHeaders()
    });
  }
}
