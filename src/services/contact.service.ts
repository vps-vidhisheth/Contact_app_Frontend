
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactDetail {
  type: string;
  value: string;
}

export interface Contact {
  contact_id?: number; // optional for new contacts
  fname: string;
  lname: string;
  is_active: boolean;
  Details?: ContactDetail[]; // optional for create/update
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

  // Create a new contact (with optional details)
  createContact(userId: number, contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(
      `${this.apiUrl}/${userId}/contacts`,
      contact,
      { headers: this.getAuthHeaders() }
    );
  }

  // Get all contacts with details
  getContactsWithDetails(userId: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(
      `${this.apiUrl}/${userId}/contacts`,
      { headers: this.getAuthHeaders() }
    );
  }

  // Get a single contact with details
  getContactByIdDetails(userId: number, contactId: number): Observable<Contact> {
    return this.http.get<Contact>(
      `${this.apiUrl}/${userId}/contacts/${contactId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // Update a contact (full update)
updateContact(userId: number, contactId: number, contact: Partial<Contact>): Observable<any> {
  const url = `${this.apiUrl}/${userId}/contacts/${contactId}`;
  return this.http.put(url, contact, { headers: this.getAuthHeaders() });
}

  // Delete a contact (cascade deletes details via backend)
  deleteContact(userId: number, contactId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${userId}/contacts/${contactId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // Add a contact detail
  addContactDetail(userId: number, contactId: number, detail: ContactDetail): Observable<ContactDetail> {
    return this.http.post<ContactDetail>(
      `${this.apiUrl}/${userId}/contacts/${contactId}/details`,
      detail,
      { headers: this.getAuthHeaders() }
    );
  }

  // Update an existing contact detail
  updateContactDetail(userId: number, detailId: number, detail: ContactDetail): Observable<ContactDetail> {
    return this.http.put<ContactDetail>(
      `${this.apiUrl}/${userId}/contacts/details/${detailId}`,
      detail,
      { headers: this.getAuthHeaders() }
    );
  }

  // Delete a single contact detail
  deleteContactDetail(userId: number, detailId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${userId}/contacts/details/${detailId}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
