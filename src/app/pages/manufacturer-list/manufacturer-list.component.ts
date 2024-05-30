import { Component } from '@angular/core';
import { ManufacturerService } from '../../service/manufacturer.service';
import { Router } from '@angular/router';

export interface Manufacturer {
  id: number;
  name: string;
  country: string;
}

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrl: './manufacturer-list.component.scss',
})
export class ManufacturerListComponent {
  data: Manufacturer[] = [];
  constructor(
    private manufacturerService: ManufacturerService,
    private router: Router
  ) {
    this.reloadData();
  }

  reloadData() {
    this.manufacturerService.getList().subscribe((manufacturer) => {
      this.data = manufacturer;
    });
  }

  edit(id: number) {
    this.router.navigate(['manufacturer/edit' + `/${id}`]);
  }

  delete(id: number) {
    this.manufacturerService.delete(id).subscribe({
      next: () => {
        this.reloadData();
      },
    });
  }

  displayedColumns: string[] = ['id', 'name', 'country', 'actions'];
}
