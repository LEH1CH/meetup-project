import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { modelRole } from '../../../models/role';
import { modelUser } from '../../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  public userForm!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);

  @Input() isCreate = false;
  @Input() roleList!: Observable<modelRole[]>;
  @Input() user!: modelUser;

  @Output() updateEvent = new EventEmitter();
  @Output() createUserEvent = new EventEmitter();
  @Output() closeFormEvent = new EventEmitter();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      fio: new FormControl<string>(this.user?.fio || '', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl<string>(this.user?.email || '', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [Validators.minLength(4)]),
      role: new FormControl<string>('USER'),
    });
  }

  check(roleName: string) {
    return this.user.roles?.some((role) => role.name === roleName);
  }
  closeForm() {
    this.closeFormEvent.emit(false);
  }
  onSubmit() {
    this.isCreate ? this.submitCreate() : this.submitEdit();
  }

  submitEdit() {
    if (this.userForm.value.password === '') {
      this.updateEvent.emit({
        id: this.user.id,
        fio: this.userForm.value.fio,
        email: this.userForm.value.email,
        role: this.userForm.value.role,
      });
      this.closeForm();
    } else if (this.userForm.value.password.length < 4) {
      return;
    } else if (this.userForm.value.password.length >= 4) {
      this.updateEvent.emit({
        id: this.user.id,
        fio: this.userForm.value.fio,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        role: this.userForm.value.role,
      });
      this.closeForm();
    }
  }
  submitCreate() {
    if (this.userForm.value.password.length < 4) {
      return;
    }
    this.createUserEvent.emit({
      fio: this.userForm.value.fio,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    });
    this.closeForm();
  }
}
