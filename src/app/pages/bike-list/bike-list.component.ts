import { Component } from '@angular/core';
import { BikeService } from '../../service/bike.service';
import { Router } from '@angular/router';

export interface Bike {
  id: number;
  manufacturer: string;
  model: string;
}

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrl: './bike-list.component.scss',
})
export class BikeListComponent {
  data: Bike[] = [];
  constructor(private bikeService: BikeService, private router: Router) {
    this.reloadData();
  }

  reloadData() {
    this.bikeService.getList().subscribe((bikes) => {
      this.data = bikes;
    });
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

  displayedColumns: string[] = ['id', 'manufacturer', 'model', 'actions'];
}
