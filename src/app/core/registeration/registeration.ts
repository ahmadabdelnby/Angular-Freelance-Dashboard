import { Component } from '@angular/core';
import { RegisterationLoginService } from '../../services/register-and-login/registeration-login-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registeration',
  imports: [CommonModule, FormsModule],
  templateUrl: './registeration.html',
  styleUrl: './registeration.scss',
})
export class Registeration {
  userData = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    profile_picture_url: '',
    phone_number: '',
    gender: '',
    birthdate: '',
    country: '',
    role: '',
    aboutMe: '',
    category: '',
    specialty: '',
    skills: [] as string[]
  };

  constructor(private userService: RegisterationLoginService) { }

  register() {
    this.userService.registerUser(this.userData).subscribe({
      next: (res) => {
        console.log('User registered successfully:', res);
        // You can save the token in localStorage or redirect
        localStorage.setItem('token', res.token);
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert(err.error.message || 'Registration failed');
      }
    });
  }
}
