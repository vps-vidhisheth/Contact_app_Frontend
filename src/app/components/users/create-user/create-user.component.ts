

import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    Object.keys(params).forEach(key => {
      if (this.newUser.hasOwnProperty(key)) {
        this.newUser[key] = decodeURIComponent(params[key]);
      }
    });
  });
}


  createUser() {
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
        this.successMessage = res?.message || 'User created successfully!';
        this.errorMessage = '';
        this.clearForm();
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Backend error:', err);
        this.errorMessage = err.error?.message || 'Failed to create user';
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
