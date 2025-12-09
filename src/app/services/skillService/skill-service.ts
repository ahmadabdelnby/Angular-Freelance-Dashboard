import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = 'http://localhost:3000/Freelancing/api/v1/skills'; // backend endpoint

  constructor(private http: HttpClient) { }

  // Helper to include JWT token
  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: ``
      })
    };
  }

  // create skill (admin only)
  createSkill(skillData: { name: string; specialty: string }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}`,
      skillData,
      this.getAuthHeaders()
    );
  }
}
