import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IRole } from '../../../models/role';
import { IUser } from '../../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  userForm!: FormGroup

  constructor(
    private fb: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      fio: new FormControl<string>(this.user.fio || '', [Validators.required, Validators.minLength(2)]),
      email: new FormControl<string>(this.user?.email || '', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
      roles: new FormControl<string>('')
    });
  }

  @Input() roleList!: Observable<IRole[]>;
  @Input() user!: IUser;

  @Output() updateEvent = new EventEmitter();

  onSubmit() {
    console.log(this.user.id)
    console.log(this.userForm.value.password)
    console.log(this.userForm.value.email)
    console.log(this.userForm.value.fio)
    console.log(this.userForm.value.roles)
    // if (this.userForm.value.password === '****') {
    //   this.updateEvent.emit({ id: this.user.id, fio: this.fio, email: this.email })
    // } else {
    //   this.updateEvent.emit({ id: this.user.id, fio: this.fio, email: this.email, password: this.password })
    // }
  }
}