import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../../../services/auth.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];
  page: number = 1;
  limit: number = 5;
  total: number = 0;
  totalPages: number = 0;
  loading: boolean = false;
  error: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

 fetchUsers(): void {
  this.loading = true;
  this.error = '';
  this.authService.getUsers(this.page, this.limit).subscribe({
    next: (res) => {
      this.users = res.users;
      this.total = res.total;
      this.page = res.page;
      this.limit = res.limit;
      this.totalPages = Math.ceil(this.total / this.limit);
      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching users:', err);
      this.error = 'Failed to load users';
      this.loading = false;
    }
  });
}


  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchUsers();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchUsers();
    }
  }

  goToPage(p: number): void {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
      this.fetchUsers();
    }
  }

  // Getter for pagination buttons
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
