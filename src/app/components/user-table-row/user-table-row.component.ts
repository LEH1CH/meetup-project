import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IRole } from '../../models/role';
import { IUser } from '../../models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: '[app-user-table-row]',
  templateUrl: './user-table-row.component.html',
  styleUrl: './user-table-row.component.scss'
})
export class UserTableRowComponent {

  @Input() roleList!: Observable<IRole[]>;
  @Input() user!: IUser;

  isEdit = false;

  @Output() updateEvent = new EventEmitter();

  update(value: any) {
    this.updateEvent.emit(value)
  }
}