import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { modelRole } from '../../models/role';
import { modelUser } from '../../models/user';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit, OnDestroy {
  public tableTitles: string[] = ['Имя', 'Почта', 'Пароль', 'Роли', 'Действия'];
  public isEdit: boolean = false;
  public userList$!: Observable<modelUser[] | any>;
  public roleList$!: Observable<modelRole[]>;
  private destroy: Subject<void> = new Subject();
  currentPage = 1;
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    public spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

  getUsers() {
    this.userList$ = this.userService.userList;
    this.userService
      .getAll()
      .pipe(takeUntil(this.destroy))
      .subscribe((data: modelUser[] | null) => {
        if (!data) {
          return;
        }
        this.userService.userList = data;
      });
  }

  getRoles() {
    this.roleList$ = this.roleService.roleList;
    this.roleService
      .getAll()
      .pipe(takeUntil(this.destroy))
      .subscribe((data: modelRole[] | null) => {
        if (!data) {
          return;
        }
        this.roleService.roleList = data;
      });
  }

  update(value: {
    id: number;
    fio: string;
    email: string;
    password: string;
    role: string;
  }) {
    this.updateUser(value.id, value.email, value.fio, value.password);
    this.addRole(value.role, value.id);
  }

  updateUser(id: number, email: string, fio: string, password: string) {
    this.userService
      .update(id, email, fio, password)
      .pipe(takeUntil(this.destroy))
      .subscribe();
  }

  createUser(value: { fio: string; email: string; password: string }) {
    this.userService
      .create(value.fio, value.email, value.password)
      .pipe(takeUntil(this.destroy))
      .subscribe((user: modelUser | null) => {
        if (!user) {
          return;
        }
        this.getUsers();
      });
  }

  addRole(name: string, userId: number) {
    this.userService
      .addRole(name, userId)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: modelRole | null) => {
        if (!data) {
          return;
        }
        this.getUsers();
      });
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: modelUser | null) => {
        if (!data) {
          return;
        }
        this.getUsers();
      });
  }

  closeUserForm() {
    this.isEdit = false;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
