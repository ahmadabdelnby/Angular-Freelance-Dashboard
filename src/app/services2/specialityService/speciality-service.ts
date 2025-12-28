import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root',
})
export class SpecialityService {

  private specialties$ = new BehaviorSubject<any[] | null>(null);

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getSpecialties() {
    if (!this.specialties$.value) {
      const token = this.loginService.getToken();
      console.log('SpecialityService - Token:', token);
      
      const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
      
      this.http.get<any[]>('http://localhost:3000/Freelancing/api/v1/specialties', { headers })
        .pipe(
          catchError(error => {
            console.error('SpecialityService - Error fetching specialties:', error);
            console.error('Error status:', error.status);
            console.error('Error message:', error.message);
            this.specialties$.next([]);
            return of([]);
          })
        )
        .subscribe(data => {
          console.log('SpecialityService - Specialties received:', data);
          this.specialties$.next(data);
        });
    }
    return this.specialties$.asObservable();
  }
}


