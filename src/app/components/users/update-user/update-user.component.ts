import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, User } from '../../../../services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userId: number = 0; 
  user: Partial<User> = {}; 
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['userId']) {
        this.userId = +params['userId'];
      }
      if (params['f_name']) {
        this.user.f_name = params['f_name'];
      }
      if (params['l_name']) {
        this.user.l_name = params['l_name'];
      }
      if (params['email']) {
        this.user.email = params['email'];
      }
    });
  }

  loadUser(page: number = 1, limit: number = 1000) { 
    if (!this.userId) {
      this.errorMessage = 'Please enter a valid user ID.';
      return;
    }

    this.authService.getUsers(page, limit).subscribe({
      next: ({ users }) => {  
        const u = users.find(x => x.user_id === this.userId);
        if (u) {
          this.user = { ...u }; 
          this.errorMessage = '';
        } else {
          this.errorMessage = 'User not found.';
        }
      },
      error: () => {
        this.errorMessage = 'Failed to fetch users.';
      }
    });
  }


  updateUser() {
    if (!this.userId) {
      this.errorMessage = 'User ID is required to update.';
      return;
    }

    this.authService.updateUserWithParams({
      userId: this.userId,
      f_name: this.user.f_name,
      l_name: this.user.l_name,
      email: this.user.email,
      password: this.user.password,
      is_admin: this.user.is_admin,
      is_active: this.user.is_active
    }).subscribe({
      next: (res: any) => {
        this.successMessage = res?.message || 'User updated successfully!';
        this.errorMessage = '';

        if (res?.user) {
          this.user = { ...res.user };
        }
      },
      error: (err: any) => {
        console.error('Backend error:', err);
        this.errorMessage = err.error?.message || 'Failed to update user';
        this.successMessage = '';
      }
    });
  }
}
