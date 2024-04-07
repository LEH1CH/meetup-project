import { Component } from '@angular/core';
import { IUser } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { IRole } from '../../models/role';
import { RoleService } from '../../services/role.service';


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  tableTitles: string[] = ['Имя', 'Почта', 'Пароль', 'Роли', 'Действия']
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
  updateUser(value: { id: number, fio: string, email: string, password: string }) {
    this.userService.update(value).subscribe((data: IUser | null) => {
      if (!data) { return }
      console.log(data)
    });
  }
  addRole() {
    this.userService.add().subscribe((data: IRole | null) => {
      if (!data) { return }
      console.log(data)
    });
  }
  // addRole(value: {name: string, userId: number}) {
  //   this.roleService.add(value.name, value.userId).subscribe((data: IRole | null) => {
  //     if (!data) { return }
  //     console.log(data)
  //   });
  // }
}