import { Component } from '@angular/core';
import { LoginService } from '../../services2/loginService/login-service';

@Component({
  selector: 'app-admin-profile',
  imports: [],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.scss',
})
export class AdminProfile {
   constructor(public loginService: LoginService) {}
}
