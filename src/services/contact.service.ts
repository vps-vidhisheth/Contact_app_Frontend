

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); 
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token && token.trim() !== '') {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }


  createContact(userId: number, contact: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${userId}/contacts`,
      contact,
      { headers: this.getAuthHeaders() }
    );
  }

  getContacts(userId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${userId}/contacts`,
      { headers: this.getAuthHeaders() }
    );
  }

  updateContact(userId: number, contactId: number, contact: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${userId}/contacts/${contactId}`,
      contact,
      { headers: this.getAuthHeaders() }
    );
  }


  deleteContact(userId: number, contactId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${userId}/contacts/${contactId}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
