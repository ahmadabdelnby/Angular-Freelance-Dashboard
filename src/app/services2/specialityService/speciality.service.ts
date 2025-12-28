import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  private apiUrl = `${environment.apiUrl}/specialties`;

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
   * Get all specialties
   */
  getAllSpecialties(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get specialty by ID
   */
  getSpecialtyById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get specialties by category
   */
  getSpecialtiesByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/${categoryId}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Create new specialty
   */
  createSpecialty(specialtyData: any): Observable<any> {
    return this.http.post(this.apiUrl, specialtyData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update specialty
   */
  updateSpecialty(id: string, specialtyData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, specialtyData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete specialty
   */
  deleteSpecialty(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
