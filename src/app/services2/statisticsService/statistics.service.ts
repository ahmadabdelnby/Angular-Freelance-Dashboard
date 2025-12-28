import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = `${environment.apiUrl}/statistics`;

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
   * Get platform statistics (Admin only)
   * Returns users, jobs, proposals, contracts, payments stats and revenue
   */
  getPlatformStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/platform`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get growth data for charts
   * @param period - 'day' | 'week' | 'month' | 'year'
   */
  getGrowthData(period: 'day' | 'week' | 'month' | 'year' = 'month'): Observable<any> {
    return this.http.get(`${this.apiUrl}/growth`, {
      params: { period },
      headers: this.getHeaders()
    });
  }

  /**
   * Get user dashboard statistics
   * Returns personal stats for the logged-in user
   */
  getUserDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get formatted chart data for dashboard
   * Returns ready-to-use data for charts (userGrowth, revenueGrowth, jobsStatus)
   * @param params - { range: string, startDate?: string, endDate?: string }
   */
  getChartData(params?: any): Observable<any> {
    console.log('📤 Sending chart data request with params:', params);
    return this.http.get(`${this.apiUrl}/charts`, {
      params: params || {},
      headers: this.getHeaders()
    });
  }
}
