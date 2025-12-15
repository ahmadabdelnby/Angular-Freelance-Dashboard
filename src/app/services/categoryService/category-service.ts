import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/Freelancing/api/v1/categories'; // backend endpoint

  constructor(private http: HttpClient) { }

  // get all specialities
  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createCategory(data: any): Observable<any> {
    console.log('Sending to backend:', data);

    return this.http.post<any>(`${this.apiUrl}`, data);
  }
  updateCategory(id: string, data: any): Observable<any> {
        console.log('Sending to backend:', data);

    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
