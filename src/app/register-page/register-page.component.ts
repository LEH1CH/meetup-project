// register-page.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  email: string = '';
  password: string = '';
  fio: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register({email: this.email, password: this.email, fio: this.fio})
      .subscribe(
        response => {
          // Регистрация прошла успешно
          console.log('Registration successful:', response);
        },
        error => {
          // Произошла ошибка при регистрации
          console.error('Registration error:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
  }
}
