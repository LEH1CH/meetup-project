import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  loginForm: FormGroup;

  @Output() loginEvent = new EventEmitter();

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginEvent.emit({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });

    this.loginForm.reset();
  }
}
