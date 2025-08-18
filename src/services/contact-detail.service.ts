

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactDetailService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); 
    if (!token) throw new Error('No JWT token found. Please login first.');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addContactDetail(userId: number, contactId: number, body: any): Observable<any> {
    const url = `${this.baseUrl}/user/${userId}/contacts/${contactId}/details`;
    return this.http.post(url, body, { headers: this.getAuthHeaders() });
  }

  getContactDetails(userId: number, contactId: number): Observable<any> {
    const url = `${this.baseUrl}/user/${userId}/contacts/${contactId}/details`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  updateContactDetail(userId: number, contactId: number, detailId: number, detailData: any): Observable<any> {
    const userIdNum = +userId;
    const contactIdNum = +contactId;
    const detailIdNum = +detailId;

    const url = `${this.baseUrl}/user/${userIdNum}/contacts/${contactIdNum}/details/${detailIdNum}`;

    const typeLower = detailData.type.trim().toLowerCase();
    const body = typeLower === 'email'
      ? { email: detailData.value, isActive: detailData.isActive }
      : { phone: detailData.value, isActive: detailData.isActive };

    return this.http.put(url, body, { headers: this.getAuthHeaders() });
  }

  deleteContactDetail(userId: number, contactId: number, detailId: number): Observable<any> {
    const url = `${this.baseUrl}/user/${userId}/contacts/${contactId}/details/${detailId}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() });
  }
}
