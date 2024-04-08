import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IRole } from '../../models/role';
import { IUser } from '../../models/user';

@Component({
  selector: '[app-user-table-row]',
  templateUrl: './user-table-row.component.html',
  styleUrl: './user-table-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableRowComponent {
  @Input() roleList!: Observable<IRole[]>;
  @Input() user!: IUser;
  @Input() isCreate!: boolean;

  isEdit = false;

  @Output() updateEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  update(value: IUser) {
    this.updateEvent.emit(value);
  }
  delete() {
    if (!confirm('Подтвердите удаление пользователя')) {
      return;
    }
    this.deleteEvent.emit(this.user.id);
  }
  closeForm() {
    this.isEdit = false;
  }
}
