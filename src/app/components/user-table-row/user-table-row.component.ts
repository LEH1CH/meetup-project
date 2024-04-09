import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { modelRole } from '../../models/role';
import { modelUser } from '../../models/user';

@Component({
  selector: '[app-user-table-row]',
  templateUrl: './user-table-row.component.html',
  styleUrl: './user-table-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableRowComponent {
  @Input() roleList!: Observable<modelRole[]>;
  @Input() user!: modelUser;
  @Input() isCreate!: boolean;

  public isEdit = false;

  @Output() updateEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  update(value: modelUser) {
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
