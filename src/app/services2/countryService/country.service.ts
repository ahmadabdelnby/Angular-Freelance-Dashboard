import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = `${environment.apiUrl}/countries`;

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
   * Get all countries
   */
  getAllCountries(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get country by ID
   */
  getCountryById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Create new country
   */
  createCountry(countryData: any): Observable<any> {
    return this.http.post(this.apiUrl, countryData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update country
   */
  updateCountry(id: string, countryData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, countryData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete country
   */
  deleteCountry(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
