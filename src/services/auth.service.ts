
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface User {
  user_id?: number;
  f_name: string;
  l_name: string;
  email: string;
  password: string;
  is_admin?: boolean | number;
  is_active?: boolean | number;
}

export interface DecodedToken {
  user_id: number;
  email: string;
  is_admin: boolean | number;
  exp: number;
  iat?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1';  
  private tokenKey = 'authToken';

  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem(this.tokenKey));
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.loggedIn.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
  }

  setLoginStatus(status: boolean): void {
    this.loggedIn.next(status);
  }

  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserRole(): 'admin' | 'staff' | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;
    return decoded.is_admin === true || decoded.is_admin === 1 ? 'admin' : 'staff';
  }

  isTokenExpired(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded?.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  //  User CRUD 
  createUser(userData: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, userData, { headers: this.getAuthHeaders() });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`, { headers: this.getAuthHeaders() });
  }

 updateUserWithParams(params: any): Observable<any> {
  const userId = params.userId;
  const body = {
    f_name: params.f_name,
    l_name: params.l_name,
    email: params.email,
    password: params.password,
    is_admin: params.is_admin,
    is_active: params.is_active
  };

  return this.http.put(
    `${this.baseUrl}/user/${userId}`,
    body, 
    { headers: this.getAuthHeaders() }
  );
}

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`, { headers: this.getAuthHeaders() });
  }

  //  Contact CRUD
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

  //  Contact Details CRUD 
  createContactDetail(userId: number, contactId: number, detailData: any): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}/contacts/${contactId}/details`;
    return this.http.post(url, detailData, { headers: this.getAuthHeaders() });
  }

  getContactDetails(contactId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/contacts/${contactId}/details`, { headers: this.getAuthHeaders() });
  }

  updateContactDetail(userId: number, contactId: number, detailId: number, detailData: any): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}/contacts/${contactId}/details/${detailId}`;
    const body = detailData.type.toLowerCase() === 'email'
      ? { email: detailData.value }
      : { phone: detailData.value };

    return this.http.put(url, body, { headers: this.getAuthHeaders() });
  }

  deleteContactDetail(contactId: number, detailId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contacts/${contactId}/details/${detailId}`, { headers: this.getAuthHeaders() });
  }
}
