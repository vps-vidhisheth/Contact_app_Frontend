// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit {
//   isAdmin: boolean = false;
//   isStaff: boolean = false;
//   isLoggedIn: boolean = false;

//   constructor(private router: Router, private authService: AuthService) {}

//   ngOnInit(): void {
//     this.checkUserRole();

//     // ✅ Listen for login/logout changes
//     this.authService.isLoggedIn$.subscribe(status => {
//       this.isLoggedIn = status;
//       this.checkUserRole();
//     });
//   }

//   checkUserRole() {
//     const role = this.authService.getUserRole();  
//     this.isAdmin = role === 'admin';
//     this.isStaff = role === 'staff';
//   }

//   logout() {
//     this.authService.logout(); 
//     this.router.navigate(['/login']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isStaff: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
   
    this.isLoggedIn = !!localStorage.getItem('authToken');
    this.checkUserRole();

    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.checkUserRole();
    });
  }

  checkUserRole(): void {
    const role = this.authService.getUserRole();
    this.isAdmin = role === 'admin';
    this.isStaff = role === 'staff';
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
