import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IRole } from '../../models/role';
import { IUser } from '../../models/user';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  tableTitles: string[] = ['Имя', 'Почта', 'Пароль', 'Роли', 'Действия'];
  public isEdit: boolean = false;
  public userList$!: Observable<IUser[]>;
  public roleList$!: Observable<IRole[]>;

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }
  getUsers() {
    this.userList$ = this.userService.userList;
    this.userService.getAll().subscribe((data: IUser[] | null) => {
      if (!data) { return }
      this.userService.userList = data;
    });
  }
  getRoles() {
    this.roleList$ = this.roleService.roleList;
    this.roleService.getAll().subscribe((data: IRole[] | null) => {
      if (!data) { return }
      this.roleService.roleList = data;
    });
  }
  update(value: { id: number, fio: string, email: string, password: string, role: string }) {
    this.updateUser(value.id, value.email, value.fio, value.password);
    this.addRole(value.role, value.id);
  }
  updateUser(id: number, email: string, fio: string, password: string) {
    this.userService.update(id, email, fio, password).subscribe();
  }
  addRole(name: string, userId: number) {
    this.userService.addRole(name, userId).subscribe((data: IRole | null) => {
      if (!data) { return }
      this.getUsers();
    });
  }
  deleteUser(id: number) {
    this.userService.delete(id).subscribe((data: IUser | null) => {
      if (!data) { return }
      this.getUsers();
    });
  }
}