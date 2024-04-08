import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  registration(value: { fio: string; email: string; password: string }): void {
    this.authService
      .registration(value.fio, value.email, value.password)
      .subscribe((user: IUser | null) => {
        if (user) {
          console.log('Регистрацмя успешна:', user);
          this.router.navigate(['login']);
          this.authService.checkAdmin();
        } else {
          console.error('Не получилось зарегистрировать пользователя');
        }
      });
  }
}
