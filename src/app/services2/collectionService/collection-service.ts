import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { LoginService } from '../loginService/login-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private apiUrl = `${environment.apiUrl}/admin`;
  private selectedCollection$ = new BehaviorSubject<string | null>(null);
  private documents$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private loginService: LoginService) { }

  // getAllCollections(): Observable<string[]> {
  //   const url = `http://localhost:3000/Freelancing/api/v1/admin/collections`;
  //   return this.http.get<string[]>(url);
  // }

  getAllCollections(): Observable<string[]> {
    const url = `${this.apiUrl}/collections`;
    const token = this.loginService.getToken();
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<string[]>(url, { headers });
  }

  getSelectedCollection(): Observable<string | null> {
    return this.selectedCollection$.asObservable();
  }

  getDocuments(): Observable<any[]> {
    return this.documents$.asObservable();
  }

  // helper to get current documents value immediately
  getDocumentsValue(): any[] {
    return this.documents$.value;
  }

  selectCollection(_name: string) {
    this.selectedCollection$.next(_name);
    // fetch documents and update BehaviorSubject
    this.getAll(_name).subscribe(docs => this.documents$.next(docs));
  }

  // getAll(collectionName: string): Observable<any[]> {
  //   const url = `http://localhost:3000/Freelancing/api/v1/admin/${collectionName}`;
  //   return this.http.get<any[]>(url);
  // }

  getAll(collectionName: string): Observable<any[]> {
    // Normalize collection name to lowercase to prevent case sensitivity issues
    const normalizedCollection = collectionName.toLowerCase();
    
    // Map collection names to their actual backend routes
    const collectionMapping: { [key: string]: string } = {
      'portfolioitems': 'portfolio',
      'conversations': 'chat/conversations/all',
      'messages': 'chat/messages',
      'contract': 'contracts',  // Map singular to plural
      'payment': 'payments',    // Map singular to plural
      'jobs': 'jobs/admin/all',  // Admin endpoint for all jobs
      'payments': 'payments/admin/all',  // Admin endpoint for payments with full details
      'contacts': 'contacts',  // Contact reports endpoint
      'activity-logs': 'activity-logs',  // Activity logs endpoint
      'platform-settings': 'platform-settings'  // Platform settings endpoint
    };
    
    // Some collections don't use /admin prefix
    const collectionsWithoutAdmin = [
      'specialties', 'categories', 'skills', 'countries',
      'jobs', 'proposals', 'contracts', 'reviews',
      'payments',
      'payments', 'notifications', 'portfolio', 'users',
      'portfolioitems', 'conversations', 'messages', 'chat',
      'favorites', 'chat/conversations', 'contacts',
      'activity-logs', 'platform-settings'
    ];
    
    // Get the actual endpoint name (with mapping if exists)
    const endpointName = collectionMapping[normalizedCollection] || normalizedCollection;
    
    // Check if collection OR endpoint should skip /admin prefix
    const baseUrl = (collectionsWithoutAdmin.includes(normalizedCollection) || collectionsWithoutAdmin.includes(endpointName))
      ? environment.apiUrl 
      : this.apiUrl;
    
    const url = `${baseUrl}/${endpointName}`;
    const token = this.loginService.getToken();
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    console.log('CollectionService.getAll - Collection:', normalizedCollection);
    console.log('CollectionService.getAll - Endpoint:', endpointName);
    console.log('CollectionService.getAll - URL:', url);
    console.log('CollectionService.getAll - Token exists:', !!token);

    return this.http.get<any>(url, { headers }).pipe(
      tap(response => console.log('📥 Raw response from backend:', response)),
      map(response => {
        // If response is already an array, return it
        if (Array.isArray(response)) {
          console.log('✅ Response is already an array');
          return response;
        }
        
        // If response is an object, try to extract the array
        if (response && typeof response === 'object') {
          // Try collection name first (e.g., response.users)
          if (Array.isArray(response[normalizedCollection])) {
            console.log(`✅ Found array in response.${normalizedCollection}`);
            return response[normalizedCollection];
          }
          
          // Try endpoint name (e.g., response.portfolio for portfolioitems)
          if (Array.isArray(response[endpointName])) {
            console.log(`✅ Found array in response.${endpointName}`);
            return response[endpointName];
          }
          
          // Try common property names including 'portfolioItems' (camelCase)
          const commonKeys = ['data', 'items', 'results', 'portfolioItems', 'conversations', 'logs'];
          for (const key of commonKeys) {
            if (Array.isArray(response[key])) {
              console.log(`✅ Found array in response.${key}`);
              return response[key];
            }
          }
          
          // For platform-settings, wrap single object in array
          if (normalizedCollection === 'platform-settings') {
            console.log('✅ Platform settings - wrapping single object in array');
            return [response];
          }
        }
        
        console.warn('⚠️ Could not extract array from response, returning as-is');
        return response;
      })
    );
  }

  /** DELETE a document from a specific collection without authorization */
  // deleteDocument(collectionName: string, documentId: string | number): Observable<any> {
  //   const url = `http://localhost:3000/Freelancing/api/v1/${collectionName}/${documentId}`;
  //   return this.http.delete(url).pipe(
  //     tap(() => {
  //       // Update the BehaviorSubject locally for immediate UI update
  //       const updatedDocs = this.documents$.value.filter(doc => doc._id !== documentId);
  //       this.documents$.next(updatedDocs);
  //     })
  //   );
  // }

  deleteDocument(collectionName: string, documentId: string | number): Observable<any> {
    const url = `${environment.apiUrl}/${collectionName}/${documentId}`;

    const token = this.loginService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.delete(url, { headers }).pipe(
      tap(() => {
        const updatedDocs = this.documents$.value.filter(doc => doc._id !== documentId);
        this.documents$.next(updatedDocs);
      })
    );
  }




  /** CREATE a new document without authorization */
  // createDocument(collectionName: string, payload: any): Observable<any> {
  //   const url = `http://localhost:3000/Freelancing/api/v1/${collectionName}`;
  //   return this.http.post<any>(url, payload).pipe(
  //     tap(newDoc => {
  //       const updatedDocs = [...this.documents$.value, newDoc];
  //       this.documents$.next(updatedDocs);
  //     })
  //   );
  // }


  createDocument(collectionName: string, payload: any) {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
    console.log('Payload to POST:', payload);

    // Map collection names to their actual backend routes for CREATE
    const createEndpointMapping: { [key: string]: string } = {
      'jobs': 'jobs/admin/create',  // Admin endpoint for creating jobs
      'proposals': 'proposals/admin/create'  // Admin endpoint for creating proposals
    };

    const normalizedCollection = collectionName.toLowerCase();
    const endpoint = createEndpointMapping[normalizedCollection] || collectionName;

    return this.http.post<any>(
      `${environment.apiUrl}/${endpoint}`,
      payload,
      { headers }
    ).pipe(
      tap(newDoc => {
        this.documents$.next([...this.documents$.value, newDoc]);
      })
    );
  }
  /** UPDATE an existing document without authorization*/
  // updateDocument(collectionName: string, payload: any): Observable<any> {
  //   if (!payload._id) {
  //     throw new Error('Document must have an _id to update');
  //   }
  //   const url = `http://localhost:3000/Freelancing/api/v1/${collectionName}/${payload._id}`;
  //   return this.http.put<any>(url, payload).pipe(
  //     tap(updatedDoc => {
  //       const updatedDocs = this.documents$.value.map(doc =>
  //         doc._id === updatedDoc._id ? updatedDoc : doc
  //       );
  //       this.documents$.next(updatedDocs);
  //     })
  //   );
  // }

  updateDocument(collectionName: string, payload: any) {
    if (!payload._id) throw new Error('Cannot update document without _id');
    const token = this.loginService.getToken();
    const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});

    return this.http.put<any>(
      `${environment.apiUrl}/${collectionName}/${payload._id}`,
      payload,
      { headers }
    ).pipe(
      tap(updatedDoc => {
        const updatedDocs = this.documents$.value.map(doc =>
          doc._id === updatedDoc._id ? updatedDoc : doc
        );
        this.documents$.next(updatedDocs);
      })
    );
  }
  /** REFRESH the current selected collection documents */
  refresh(collectionName: string | null = null) {
    const name = collectionName || this.selectedCollection$.value;
    if (!name) return;
    this.getAll(name).subscribe(docs => this.documents$.next(docs));
  }
}
