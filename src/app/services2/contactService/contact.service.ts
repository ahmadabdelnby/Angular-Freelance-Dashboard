import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Contact {
  _id: string;
  fullName: string;
  email: string;
  company?: string;
  role?: string;
  phone?: string;
  country?: string;
  linkedin?: string;
  status: 'new' | 'in_progress' | 'resolved' | 'archived';
  adminNotes?: string;
  handledBy?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactStats {
  total: number;
  new: number;
  in_progress: number;
  resolved: number;
  archived: number;
  todayNew: number;
  thisWeekNew: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) {}

  getAllContacts(status?: string, page: number = 1, limit: number = 20): Observable<any> {
    let url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    if (status) {
      url += `&status=${status}`;
    }
    return this.http.get<any>(url);
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  updateContactStatus(id: string, data: { status?: string; adminNotes?: string }): Observable<Contact> {
    return this.http.patch<Contact>(`${this.apiUrl}/${id}`, data);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getContactStats(): Observable<ContactStats> {
    return this.http.get<ContactStats>(`${this.apiUrl}/stats`);
  }
}
