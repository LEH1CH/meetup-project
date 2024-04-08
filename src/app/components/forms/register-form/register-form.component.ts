import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  @Output() registrationEvent = new EventEmitter();

  constructor() {
    this.registerForm = new FormGroup({
      fio: new FormControl<string>('', [Validators.required]),
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

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.registrationEvent.emit({
      fio: this.registerForm.value.fio,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    });

    this.registerForm.reset();
  }
}
