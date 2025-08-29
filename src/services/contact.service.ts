
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactDetail {
  type: string;
  value: string;
  is_active?: boolean; 
}


export interface Contact {
  contact_id?: number; 
  fname: string;
  lname: string;
  is_active: boolean;
  Details?: ContactDetail[]; 
}



@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token && token.trim() !== '') {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  createContact(userId: number, contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(
      `${this.apiUrl}/${userId}/contacts`,
      contact,
      { headers: this.getAuthHeaders() }
    );
  }

  getContactsWithDetails(userId: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(
      `${this.apiUrl}/${userId}/contacts`,
      { headers: this.getAuthHeaders() }
    );
  }

  getContactByIdDetails(userId: number, contactId: number): Observable<Contact> {
    return this.http.get<Contact>(
      `${this.apiUrl}/${userId}/contacts/${contactId}`,
      { headers: this.getAuthHeaders() }
    );
  }

updateContact(userId: number, contactId: number, contact: Partial<Contact>): Observable<any> {
  const url = `${this.apiUrl}/${userId}/contacts/${contactId}`;
  return this.http.put(url, contact, { headers: this.getAuthHeaders() });
}

  deleteContact(userId: number, contactId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${userId}/contacts/${contactId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  addContactDetail(userId: number, contactId: number, detail: ContactDetail): Observable<ContactDetail> {
    return this.http.post<ContactDetail>(
      `${this.apiUrl}/${userId}/contacts/${contactId}/details`,
      detail,
      { headers: this.getAuthHeaders() }
    );
  }

  updateContactDetail(userId: number, detailId: number, detail: ContactDetail): Observable<ContactDetail> {
    return this.http.put<ContactDetail>(
      `${this.apiUrl}/${userId}/contacts/details/${detailId}`,
      detail,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteContactDetail(userId: number, detailId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${userId}/contacts/details/${detailId}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
