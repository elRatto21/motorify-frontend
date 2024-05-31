import { Component } from '@angular/core';
import { ManufacturerService } from '../../service/manufacturer.service';
import { Router } from '@angular/router';
import { AppAuthService } from '../../service/app.auth.service';

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
  displayedColumns: string[] = [];
  constructor(
    private manufacturerService: ManufacturerService,
    private router: Router,
    private authService: AppAuthService
  ) {
    this.reloadData();
  }

  ngOnInit(): void {
    this.authService.getRoles().subscribe((roles) => {
      if (roles.includes('admin')) {
        this.displayedColumns = ['id', 'name', 'country', 'actions'];
      } else {
        this.displayedColumns = ['id', 'name', 'country'];
      }
    });
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

  create() {
    this.router.navigate(['manufacturer/create']);
  }
}
