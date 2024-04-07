import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.isAdmin();
  }
  // isAdmin() {
  //   if (this.authService.user) {
  //     return this.authService.user.roles.find(user => user.name === 'ADMIN');
  //   }
  // }

  logout() {
    this.authService.logout();
  }
}
