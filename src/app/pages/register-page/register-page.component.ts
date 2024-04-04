import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  registration(value: { fio: string; email: string; password: string }): void {
    this.authService
      .registration(value.fio, value.email, value.password)
      .subscribe((user: IUser | null) => {
        if (user) {
          // Регистрация прошла успешно
          console.log('Registration successful:', user);
          this.router.navigate(['login']);
        } else {
          // Произошла ошибка при регистрации
          console.error('Registration failed');
        }
      });
  }
}
