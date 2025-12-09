import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialityService {
  private apiUrl = 'http://localhost:3000/Freelancing/api/v1/admin/specialties'; // backend endpoint

  constructor(private http: HttpClient) { }

  // Helper to include JWT token
  // private getAuthHeaders() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: ``
  //     })
  //   };
  // }

  // get all specialities
  getAllSpecialities(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
