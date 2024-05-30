import { Component } from '@angular/core';
import { AppAuthService } from '../../service/app.auth.service';
import { BikeService } from '../../service/bike.service';
import { ManufacturerService } from '../../service/manufacturer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
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
