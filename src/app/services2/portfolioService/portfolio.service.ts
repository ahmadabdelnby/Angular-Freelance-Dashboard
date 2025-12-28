import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = `${environment.apiUrl}/portfolio`;

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
   * Get all portfolio items (Admin only)
   */
  getAllPortfolioItems(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get portfolio item by ID
   */
  getPortfolioItemById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get portfolio items by freelancer ID
   */
  getPortfolioByFreelancer(freelancerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/freelancer/${freelancerId}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get my portfolio items
   */
  getMyPortfolio(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mine`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Create new portfolio item
   */
  createPortfolioItem(itemData: any): Observable<any> {
    return this.http.post(this.apiUrl, itemData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update portfolio item
   */
  updatePortfolioItem(id: string, itemData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, itemData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete portfolio item
   */
  deletePortfolioItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Like portfolio item
   */
  likePortfolioItem(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/like`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Unlike portfolio item
   */
  unlikePortfolioItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/like`, {
      headers: this.getHeaders()
    });
  }
}
