import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent implements OnDestroy {
  private destroy: Subject<void> = new Subject();
  constructor(private authService: AuthService, private router: Router) {}

  registration(value: { fio: string; email: string; password: string }): void {
    this.authService
      .registration(value.fio, value.email, value.password)
      .pipe(takeUntil(this.destroy))
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
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
