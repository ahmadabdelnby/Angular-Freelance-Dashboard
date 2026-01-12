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

  getImageUrl(path: string | undefined): string {
    if (!path) return '/user-default-img.png';
    
    // If already a full URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Otherwise, construct full URL
    const baseUrl = 'http://localhost:3000';
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${baseUrl}/${cleanPath}`;
  }
}
