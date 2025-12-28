import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services2/loginService/login-service';

/**
 * Auth Guard to protect dashboard routes
 * Redirects to login if user is not authenticated
 */
export const authGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn()) {
    return true;
  }

  // Redirect to login page if not authenticated
  router.navigate(['/login']);
  return false;
};
