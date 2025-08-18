import { Component } from '@angular/core';
import { AuthService, User } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUser: any = {
    f_name: '',
    l_name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    is_admin: false,
    is_active: true
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {

    const f_name = this.newUser.f_name || this.newUser.first_name;
    const l_name = this.newUser.l_name || this.newUser.last_name;

    if (!f_name || !l_name || !this.newUser.email || !this.newUser.password) {
      alert('Please fill all required fields.');
      return;
    }

    if (!this.validateEmail(this.newUser.email)) {
      alert('Invalid email address.');
      return;
    }

    const payload: User = {
      f_name: f_name.trim(),
      l_name: l_name.trim(),
      email: this.newUser.email.trim(),
      password: this.newUser.password,
      is_admin: !!this.newUser.is_admin,
      is_active: !!this.newUser.is_active
    };

    this.authService.createUser(payload).subscribe({
      next: (res: any) => {
        this.successMessage = res?.message || 'Registered successfully!';
        this.errorMessage = '';
        this.clearForm();
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Backend error:', err);
        this.errorMessage = err.error?.message || 'Registration failed';
        this.successMessage = '';
      }
    });
  }

  clearForm() {
    this.newUser = {
      f_name: '',
      l_name: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      is_admin: false,
      is_active: true
    };
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
