import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface BackendUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_admin: boolean;
  is_active: boolean;
  contacts: any;
}

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  error: string = '';
  private apiUrl = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.error = '';

    const token = this.auth.getToken();
    if (!token) {
      this.error = 'Please login as admin first.';
      this.loading = false;
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<BackendUser[]>(this.apiUrl, { headers }).subscribe({
      next: (res) => {
        this.loading = false;

        if (!res || res.length === 0) {
          this.error = 'No users found.';
          return;
        }

        this.users = res.map((user: BackendUser) => ({
          id: user.user_id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email
        }));
      },
      error: (err) => {
        this.loading = false;
        this.error = err.status === 401 ? 'Unauthorized. Login as admin.' : 'Failed to fetch users.';
        console.error(err);
      }
    });
  }
}
