import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/Freelancing/api/v1/users'; // backend endpoint

  constructor(private http: HttpClient) { }

  // Delete a user by ID
  deleteUser(userId: string): Observable<any> {
    // Include token for auth if needed
    //const token = localStorage.getItem('token') || ''; //this will be replaced by the real token in cookies or localStorage

    return this.http.delete<any>(`${this.apiUrl}/${userId}`, {
      headers: {
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MGI2NGQ5MjZkMTRhOTcwZmE2MmQzZSIsImVtYWlsIjoicmFkd2FAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzY1Mjc0NjU5LCJleHAiOjE3NjUzNjEwNTl9.T8OrzNaYJWks5olIcNQ2llu0sH1NW2WAMaLOxwaiySM` //this should be a dynamic token ${token}
      }
    });
  }


  // /**general deletion**/
  // deleteDoc(collectionName: string, docId: string): Observable<any> {
  // //const token = localStorage.getItem('token') || '';
  // return this.http.delete<any>(`http://localhost:3000/Freelancing/api/v1/${collectionName}/${docId}`, {
  //   headers: { Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MGI2NGQ5MjZkMTRhOTcwZmE2MmQzZSIsImVtYWlsIjoicmFkd2FAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzY1Mjc5OTc1LCJleHAiOjE3NjUzNjYzNzV9.ba3JojBURMr45DQeI--lgSnq0rnS3dD337EQsIRZ6Ug` }
  // });
}




