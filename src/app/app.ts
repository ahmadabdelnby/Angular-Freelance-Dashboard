import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/navbar/navbar';
import { Sidebar } from './core/sidebar/sidebar';
import { Main } from './core/main/main';
import { CommonModule } from '@angular/common';
import { Sidebar2 } from './core/sidebar2/sidebar2';
import { LoginService } from './services2/loginService/login-service';

@Component({
  selector: 'app-root',
  imports: [Sidebar2, Main, CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('admin-dashboard');
  constructor(public loginService: LoginService) {}
}
