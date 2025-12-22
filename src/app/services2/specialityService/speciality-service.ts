import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialityService {

  private specialties$ = new BehaviorSubject<any[] | null>(null);

  constructor(private http: HttpClient) { }

  getSpecialties() {
    if (!this.specialties$.value) {
      this.http.get<any[]>('http://localhost:3000/Freelancing/api/v1/admin/specialties').subscribe(data => this.specialties$.next(data));
    }
    return this.specialties$.asObservable();
  }
}


