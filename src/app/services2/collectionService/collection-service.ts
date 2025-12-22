import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginService } from '../loginService/login-service';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private selectedCollection$ = new BehaviorSubject<string | null>(null);
  private documents$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private loginService: LoginService) { }

  // getAllCollections(): Observable<string[]> {
  //   const url = `http://localhost:3000/Freelancing/api/v1/admin/collections`;
  //   return this.http.get<string[]>(url);
  // }

  getAllCollections(): Observable<string[]> {
    const url = `http://localhost:3000/Freelancing/api/v1/admin/collections`;
    const token = this.loginService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

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
    const url = `http://localhost:3000/Freelancing/api/v1/admin/${collectionName}`;
    const token = this.loginService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.get<any[]>(url, { headers });
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
    const url = `http://localhost:3000/Freelancing/api/v1/${collectionName}/${documentId}`;

    const token = this.loginService.getToken(); // use the same service as create/update
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

    return this.http.post<any>(
      `http://localhost:3000/Freelancing/api/v1/${collectionName}`,
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
      `http://localhost:3000/Freelancing/api/v1/${collectionName}/${payload._id}`,
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
