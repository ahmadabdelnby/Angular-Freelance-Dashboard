import { Component } from '@angular/core';
import { LoginService } from '../../services2/loginService/login-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private loginService: LoginService, private router: Router) { }

  onLogin() {
    this.errorMessage = '';
    this.loading = true;

    this.loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.loading = false;
        // redirect to dashboard (optional now)
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.loading = false;
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }
}
