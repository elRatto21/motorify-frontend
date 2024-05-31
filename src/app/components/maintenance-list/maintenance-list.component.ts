import { Component, OnInit } from '@angular/core';
import { Maintenance } from '../../data/maintenance';
import { MaintenanceService } from '../../service/maintenance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrl: './maintenance-list.component.scss',
})
export class MaintenanceListComponent implements OnInit {
  maintenanceList: Maintenance[] = [];
  displayedColumns: string[] = [
    'date',
    'name',
    'mileage',
    'actions',
  ];
  bikeId: number = 1;
  constructor(
    private maintenanceService: MaintenanceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bikeId = Number.parseInt(
      this.route.snapshot.paramMap.get('id') as string
    );
    this.reloadData();
  }

  reloadData() {
    this.maintenanceService.getListByBike(this.bikeId).subscribe((maintenances) => {
      this.maintenanceList = maintenances;
    });
  }

  create() {
    this.router.navigate(['maintenance/create', this.bikeId]);
  }

  delete(id: number) {
    this.maintenanceService.delete(id).subscribe({
      next: () => {
        this.reloadData();
      },
    });
  }
}
