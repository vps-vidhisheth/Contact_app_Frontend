
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    if (!this.email || !this.password) {
      alert('Please enter email and password.');
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        if (res.token) {
      
          this.authService.saveToken(res.token);

          alert(res.message || 'Login successful');
          this.router.navigate(['/users']);
          this.clearForm();
        } else {
          alert('Login failed. Token not received.');
        }
        this.isLoading = false;
      },
      error: (err) => {
        alert(err.error?.error || 'Login failed. Please check credentials.');
        this.isLoading = false;
      }
    });
  }

  clearForm() {
    this.email = '';
    this.password = '';
  }
}
