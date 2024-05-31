import { Component, OnInit } from '@angular/core';
import { AppAuthService } from './service/app.auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'motorify-frontend';

  useralias = '';
  username = '';

  constructor(private authService: AppAuthService) {}

  ngOnInit(): void {
    this.authService.usernameObservable.subscribe((name) => {
      this.username = name;
    });
    this.authService.useraliasObservable.subscribe((alias) => {
      this.useralias = alias;
    });
  }
}
