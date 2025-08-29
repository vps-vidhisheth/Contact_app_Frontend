import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.userId = +params['id']; 
      }
    });
  }


  updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: this.userId || null },
      queryParamsHandling: 'merge' 
    });
  }

  deleteUser() {
    if (!this.userId) {
      this.errorMessage = 'Please enter a valid User ID';
      this.successMessage = '';
      return;
    }

    this.authService.deleteUser(this.userId).subscribe({
      next: (res: any) => {
        this.successMessage = res?.message || 'User deleted successfully!';
        this.errorMessage = '';
        this.userId = null;

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {},
        });
      },
      error: (err: any) => {
        console.error('Delete error:', err);
        this.errorMessage = err.error?.message || 'Failed to delete user';
        this.successMessage = '';
      }
    });
  }
}
