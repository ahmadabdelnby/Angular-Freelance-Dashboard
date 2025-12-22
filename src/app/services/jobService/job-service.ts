import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
   private apiUrl = 'http://localhost:3000/Freelancing/api/v1/jobs'; // backend endpoint

  constructor(private http: HttpClient) { }

  // get all specialities
  getAllJobs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
