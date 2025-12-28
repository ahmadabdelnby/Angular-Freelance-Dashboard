import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}/favorites`;

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
   * Get all my favorites
   */
  getMyFavorites(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get favorites by type
   * @param itemModel - 'User' | 'Job' | 'PortfolioItem'
   */
  getFavoritesByType(itemModel: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/type/${itemModel}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Add to favorites
   */
  addToFavorites(itemId: string, itemModel: 'User' | 'Job' | 'PortfolioItem'): Observable<any> {
    return this.http.post(this.apiUrl, { item: itemId, itemModel }, {
      headers: this.getHeaders()
    });
  }

  /**
   * Remove from favorites
   */
  removeFromFavorites(favoriteId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${favoriteId}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Check if item is favorite
   */
  isFavorite(itemId: string, itemModel: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check/${itemId}/${itemModel}`, {
      headers: this.getHeaders()
    });
  }
}
