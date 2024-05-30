import { Component } from '@angular/core';
import { AppAuthService } from '../../service/app.auth.service';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.scss',
})
export class AppLoginComponent {
  constructor(private authService: AppAuthService) {}

  public login() {
    this.authService.login();
  }
}
