import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialityService {
  private apiUrl = 'http://localhost:3000/Freelancing/api/v1/specialties'; // backend endpoint

  constructor(private http: HttpClient) { }

  // get all specialities
  getAllSpecialities(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createSpeciality(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  updateSpeciality(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteSpeciality(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
