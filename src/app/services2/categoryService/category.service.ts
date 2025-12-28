import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

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
   * Get all categories
   */
  getAllCategories(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get category by ID
   */
  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Create new category
   */
  createCategory(categoryData: any): Observable<any> {
    return this.http.post(this.apiUrl, categoryData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update category
   */
  updateCategory(id: string, categoryData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, categoryData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete category
   */
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
