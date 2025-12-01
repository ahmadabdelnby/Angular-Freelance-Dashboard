import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private apiUrl = 'http://localhost:5000/api/admin'; // backend endpoint

  constructor(private http: HttpClient) { }

  // fetch collection names
  getCollections(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/collections`);
  }


  
  //get all docs in a specific collection
  getCollectionDocs(collectionName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${collectionName}`);
  }
}
