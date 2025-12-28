import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services2/loginService/login-service';

/**
 * Login Guard to prevent logged-in users from accessing login page
 * Redirects to dashboard if user is already authenticated
 */
export const loginGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn()) {
    // User is already logged in, redirect to dashboard
    router.navigate(['/dashboard']);
    return false;
  }

  // User is not logged in, allow access to login page
  return true;
};
