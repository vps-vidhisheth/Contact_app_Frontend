
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


export interface User {
  user_id?: number; 
  f_name: string;
  l_name: string;
  email: string;
  password: string;
  is_admin?: boolean | number;
  is_active?: boolean | number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api'; 

  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

 
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
    this.loggedIn.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }

  setLoginStatus(status: boolean) {
    this.loggedIn.next(status);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

 
  createUser(userData: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, userData, { headers: this.getAuthHeaders() });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`, { headers: this.getAuthHeaders() });
  }

  updateUser(id: number, userData: Partial<User>): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${id}`, userData, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${id}`, { headers: this.getAuthHeaders() });
  }


  createContact(userId: number, contactData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/${userId}/contacts`, contactData, { headers: this.getAuthHeaders() });
  }

  getContacts(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/contacts`, { headers: this.getAuthHeaders() });
  }

  updateContact(userId: number, contactId: number, contactData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}/contacts/${contactId}`, contactData, { headers: this.getAuthHeaders() });
  }

  deleteContact(userId: number, contactId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}/contacts/${contactId}`, { headers: this.getAuthHeaders() });
  }


 createContactDetail(userId: number, contactId: number, detailData: any): Observable<any> {
  const url = `${this.baseUrl}/user/${userId}/contacts/${contactId}/details`;
  return this.http.post(url, detailData, { headers: this.getAuthHeaders() });
}

  getContactDetails(contactId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/contacts/${contactId}/details`, { headers: this.getAuthHeaders() });
  }

 updateContactDetail(userId: number, contactId: number, detailId: number, detailData: any): Observable<any> {
  const url = `${this.baseUrl}/user/${userId}/contacts/${contactId}/details/${detailId}`;

  const body = detailData.type.toLowerCase() === 'email'
    ? { email: detailData.value }
    : { phone: detailData.value };

  return this.http.put(url, body, { headers: this.getAuthHeaders() });
}

  deleteContactDetail(contactId: number, detailId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contacts/${contactId}/details/${detailId}`, { headers: this.getAuthHeaders() });
  }
}
