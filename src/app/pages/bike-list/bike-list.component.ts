import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../service/bike.service';
import { Router } from '@angular/router';
import { Manufacturer } from '../../data/manufacturer';
import { AppAuthService } from '../../service/app.auth.service';

export interface Bike {
  id: number;
  manufacturer: Manufacturer;
  model: string;
}

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrl: './bike-list.component.scss',
})
export class BikeListComponent {
  isAdmin: boolean = false;
  username: string = '';
  data: Bike[] = [];
  constructor(
    private bikeService: BikeService,
    private router: Router,
    private authService: AppAuthService
  ) {
    this.authService.getRoles().subscribe((roles) => {
      if (roles.includes('admin')) {
        this.isAdmin = true;
      }
    });
    this.authService.useraliasObservable.subscribe((alias) => {
      this.username = alias;
    });
    this.reloadData();
  }

  reloadData() {
    if (this.isAdmin) {
      this.bikeService.getList().subscribe((bikes) => {
        this.data = bikes;
      });
    } else {
      this.bikeService.getListByUser(this.username).subscribe((bikes) => {
        this.data = bikes;
      });
    }
  }

  edit(id: number) {
    this.router.navigate(['bike/edit', id]);
  }

  info(id: number) {
    this.router.navigate(['bike/info', id]);
  }

  delete(id: number) {
    this.bikeService.delete(id).subscribe({
      next: () => {
        this.reloadData();
      },
    });
  }

  create() {
    this.router.navigate(['bike/create']);
  }

  displayedColumns: string[] = ['id', 'manufacturer', 'model', 'actions'];
}
