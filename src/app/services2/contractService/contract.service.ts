import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = `${environment.apiUrl}/contracts`;

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
   * Get all contracts (Admin only)
   */
  getAllContracts(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get contract by ID
   */
  getContractById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get my contracts (as client or freelancer)
   */
  getMyContracts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mycontracts`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Create new contract
   */
  createContract(contractData: any): Observable<any> {
    return this.http.post(this.apiUrl, contractData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Update contract
   */
  updateContract(id: string, contractData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contractData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete contract
   */
  deleteContract(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Complete contract
   */
  completeContract(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/complete`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Terminate contract
   */
  terminateContract(id: string, reason: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/terminate`, { reason }, {
      headers: this.getHeaders()
    });
  }

  /**
   * Pause contract
   */
  pauseContract(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/pause`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Resume contract
   */
  resumeContract(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/resume`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Submit deliverable
   */
  submitDeliverable(id: string, deliverableData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/deliverables`, deliverableData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Admin: Cancel contract and refund to client
   */
  adminCancelContract(id: string, reason?: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/admin/cancel`, { reason }, {
      headers: this.getHeaders()
    });
  }

  /**
   * Admin: Update contract amount
   */
  adminUpdateContractAmount(id: string, newAmount: number, reason?: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/admin/update-amount`, { newAmount, reason }, {
      headers: this.getHeaders()
    });
  }

  /**
   * Admin: Force complete contract and release payment
   */
  adminCompleteContract(id: string, reason?: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/admin/complete`, { reason }, {
      headers: this.getHeaders()
    });
  }
}
