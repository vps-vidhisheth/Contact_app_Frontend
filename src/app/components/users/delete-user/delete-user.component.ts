import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  userId: number | null = null; 
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  deleteUser() {
    if (!this.userId) {
      this.errorMessage = ' Please enter a valid User ID';
      this.successMessage = '';
      return;
    }

    this.authService.deleteUser(this.userId).subscribe({
      next: (res: any) => {
        this.successMessage = res?.message || ' User deleted successfully!';
        this.errorMessage = '';
        this.userId = null; 
        alert(' User has been deleted successfully!');
      },
      error: (err: any) => {
        console.error('Delete error:', err);
        this.errorMessage = err.error?.message || ' Failed to delete user';
        this.successMessage = '';
      }
    });
  }
}
