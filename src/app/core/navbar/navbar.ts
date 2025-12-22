import { Component } from '@angular/core';
import { LoginService } from '../../services2/loginService/login-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminProfile } from '../admin-profile/admin-profile';
declare var bootstrap: any; // tells TS there’s a global bootstrap object

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(
    public loginService: LoginService, // public so template can use it
  ) { }


  logout() {
    // Hide profile modal if open
    const modalEl = document.getElementById('profileModal');
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modalInstance.hide();
    }

    // Perform logout
    this.loginService.logout();
  }



}
