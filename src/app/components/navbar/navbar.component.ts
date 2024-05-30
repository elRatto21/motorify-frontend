import { Component } from '@angular/core';
import { AppAuthService } from '../../service/app.auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  username: string = '';

  constructor(private authService: AppAuthService) {
    this.loadUsername();
  }

  loadUsername() {
    this.authService.useraliasObservable.subscribe((alias) => {
      this.username = alias;
    });
  }

  logout() {
    this.authService.logout();
  }
}
