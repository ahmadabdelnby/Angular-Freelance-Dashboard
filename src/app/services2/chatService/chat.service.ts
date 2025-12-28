import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = `${environment.apiUrl}/chat`;

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
   * Get all conversations for current user
   */
  getMyConversations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/conversations`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get conversation by ID
   */
  getConversationById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/conversations/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Create new conversation
   */
  createConversation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/conversation`, data, {
      headers: this.getHeaders()
    });
  }

  /**
   * Get messages in a conversation
   */
  getMessages(conversationId: string, page: number = 1, limit: number = 50): Observable<any> {
    return this.http.get(`${this.apiUrl}/conversation/${conversationId}/messages`, {
      params: { page: page.toString(), limit: limit.toString() },
      headers: this.getHeaders()
    });
  }

  /**
   * Send message
   */
  sendMessage(conversationId: string, content: string, attachments?: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/message`, 
      { conversation_id: conversationId, content, attachments }, 
      { headers: this.getHeaders() }
    );
  }

  /**
   * Mark message as read
   */
  markMessageAsRead(messageId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/message/${messageId}/read`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete message
   */
  deleteMessage(messageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/message/${messageId}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Archive conversation
   */
  archiveConversation(conversationId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/conversation/${conversationId}/archive`, {}, {
      headers: this.getHeaders()
    });
  }

  /**
   * Mute conversation
   */
  muteConversation(conversationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/conversations/${conversationId}/mute`, {}, {
      headers: this.getHeaders()
    });
  }
}
