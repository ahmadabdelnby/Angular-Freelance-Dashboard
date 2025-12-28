import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private apiUrl = `${environment.apiUrl}/proposals`;

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
   * Get all proposals (Admin only)
   */
  getAllProposals(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get proposal by ID
   */
  getProposalById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get my proposals
   */
  getMyProposals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mine`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get proposals by job ID
   */
  getProposalsByJob(jobId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/${jobId}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Create new proposal
   */
  createProposal(proposalData: any): Observable<any> {
    return this.http.post(this.apiUrl, proposalData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update proposal
   */
  updateProposal(id: string, proposalData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, proposalData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete proposal
   */
  deleteProposal(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Hire proposal (accept)
   */
  hireProposal(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/hire`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Reject proposal
   */
  rejectProposal(id: string, reason?: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/reject`, { reason }, {
      headers: this.getHeaders()
    });
  }

  /**
   * Withdraw proposal
   */
  withdrawProposal(id: string, reason?: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/withdraw`, { reason }, {
      headers: this.getHeaders()
    });
  }
}
