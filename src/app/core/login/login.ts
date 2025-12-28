import { Component } from '@angular/core';
import { LoginService } from '../../services2/loginService/login-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services2/toastService/toast-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private toastService: ToastService
  ) { }

  onLogin() {
    this.errorMessage = '';
    
    // Validate inputs before sending
    if (!this.email || !this.email.trim()) {
      this.errorMessage = 'Email is required';
      return;
    }
    
    if (!this.password || !this.password.trim()) {
      this.errorMessage = 'Password is required';
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }
    
    console.log('🔹 Attempting login with:', { email: this.email, password: '***' });
    
    this.loading = true;

    this.loginService.login(this.email.trim(), this.password.trim()).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.loading = false;
        this.toastService.success('Login successful! Welcome back.');
        // Redirect to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.loading = false;
        this.errorMessage = err.error?.message || 'Login failed';
        this.toastService.error(this.errorMessage);
      }
    });
  }
}
