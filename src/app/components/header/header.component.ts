import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkAdmin();
  }

  logout() {
    this.authService.logout();
    this.authService.checkAdmin();
  }
}
