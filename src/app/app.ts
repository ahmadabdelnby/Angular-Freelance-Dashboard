import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Main } from './core/main/main';
import { CommonModule } from '@angular/common';
import { Sidebar2 } from './core/sidebar2/sidebar2';
import { Navbar } from './core/navbar/navbar';
import { AdminProfile } from './core/admin-profile/admin-profile';
import { LoginService } from './services2/loginService/login-service';
import { ToastContainer } from './core/toast-container/toast-container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar2, Main, Navbar, AdminProfile, CommonModule, RouterOutlet, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('admin-dashboard');
  constructor(public loginService: LoginService) {}
}
