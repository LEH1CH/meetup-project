import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.user && authService.isAdmin) {
    return true;
  }
  router.navigate(['']);
  return false;
};
