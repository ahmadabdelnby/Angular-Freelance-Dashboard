import { Component } from '@angular/core';
import { LoginService } from '../../services2/loginService/login-service';
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { AdminProfile } from '../admin-profile/admin-profile';
declare var bootstrap: any; // tells TS there's a global bootstrap object

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, AsyncPipe, DatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  showModal = false;

  constructor(
    public loginService: LoginService, // public so template can use it
  ) { }

  openModal(event: Event) {
    event.preventDefault();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  logout() {
    this.closeModal();
    this.loginService.logout();
  }
}
