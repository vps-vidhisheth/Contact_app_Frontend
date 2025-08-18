import { Component } from '@angular/core';
import { AuthService, User } from '../../../../services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  userId: number = 0; 
  user: Partial<User> = {}; 
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  loadUser() {
    if (!this.userId) {
      this.errorMessage = 'Please enter a valid user ID.';
      return;
    }

    this.authService.getUsers().subscribe({
      next: (users: User[]) => {
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

    this.authService.updateUser(this.userId, this.user).subscribe({
      next: (res: any) => {
        this.successMessage = res?.message || 'User updated successfully!';
        this.errorMessage = '';
      },
      error: (err: any) => {
        console.error('Backend error:', err);
        this.errorMessage = err.error?.message || 'Failed to update user';
        this.successMessage = '';
      }
    });
  }
}
