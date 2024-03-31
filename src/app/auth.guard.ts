// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Разрешаем доступ, если пользователь залогинен
    } else {
      this.router.navigate(['/login']); // Перенаправляем незалогиненных пользователей на страницу логина
      return false;
    }
  }
}
