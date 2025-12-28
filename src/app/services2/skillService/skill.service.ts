import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = `${environment.apiUrl}/skills`;

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
   * Get all skills
   */
  getAllSkills(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get skill by ID
   */
  getSkillById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Create new skill
   */
  createSkill(skillData: any): Observable<any> {
    return this.http.post(this.apiUrl, skillData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update skill
   */
  updateSkill(id: string, skillData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, skillData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete skill
   */
  deleteSkill(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
