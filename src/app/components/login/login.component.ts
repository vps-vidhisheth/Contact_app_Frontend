import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params['email']) {
        this.email = decodeURIComponent(params['email']);
      }
    });
  }

  updateURL(value: string) {
    const encodedValue = encodeURIComponent(value.trim());
    this.router.navigate(['/login', encodedValue], {
      replaceUrl: true
    });
  }

  onLogin() {
    if (!this.email || !this.password) {
      alert('Please enter email and password.');
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log('Login API response:', res);

        if (res && res.token) {
          this.authService.saveToken(res.token);
          alert(res.message || 'Login successful');

          const role = this.authService.getUserRole();
          if (role === 'admin') {
            this.router.navigate(['/users']);
          } else if (role === 'staff') {
            this.router.navigate(['/contacts']);
          } else {
            this.router.navigate(['/login']); 
          }

          this.clearForm();
        } else {
          alert('Login failed. Token not received.');
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Login API error:', err);
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
