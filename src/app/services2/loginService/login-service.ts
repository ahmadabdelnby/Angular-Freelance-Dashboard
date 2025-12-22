import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, EMPTY } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/Freelancing/api/v1'; // adjust
  private tokenKey = 'auth_token';

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }


  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.userSubject.next(response.user);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser() {

    return this.userSubject.value;
  }

  getUserIdFromToken(): string | null {
  const token = this.getToken();
    console.log('Token:', token); // 🔹 log token

  if (!token) return null;

  try {
    const payload: any = jwtDecode(token);
      console.log('payload:', payload.id); // 🔹 log token

    return payload.id;  // make sure your token has `id`
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}
  /** Fetch full profile from the backend */
  fetchUserProfile() {
  const userId = this.getUserIdFromToken();
  if (!userId) return EMPTY; // import { EMPTY } from 'rxjs'

  return this.http.get<any>(`${this.apiUrl}/users/${userId}`).pipe(
    tap((user) => {
      this.userSubject.next(user);
    })
  );
}

 private loadUserFromToken() {
  const token = this.getToken();
  if (token) {
    this.fetchUserProfile().subscribe({
      next: () => { },
      error: () => this.logout(), // invalid token, force logout
    });
  }
}

}
