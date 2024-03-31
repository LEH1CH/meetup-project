import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  fio: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const credentials = {
      email: this.email,
      password: this.password,
      fio: this.fio,
    };
    this.authService.login(credentials).subscribe(
      (response) => {
        // Успешный вход, устанавливаем флаг залогиненности и перенаправляем на страницу с записями
        this.authService.setLoggedIn(true);
        this.router.navigate(['/todo-list']);
      },
      (error) => {
        // Ошибка входа, выводим сообщение об ошибке
        this.errorMessage = error.message;
      }
    );
  }

  logout(): void {
  this.authService.logout();
  this.authService.setLoggedIn(false); // Устанавливаем флаг залогиненности в false
  // После выхода перенаправляем на страницу логина
  this.router.navigate(['/login']);
  // Проверяем, что токен удален из локального хранилища
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('Токен успешно удален');
  } else {
    console.log('Ошибка: токен не удален');
  }
}

}
