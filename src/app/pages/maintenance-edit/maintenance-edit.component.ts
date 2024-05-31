import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Expense } from '../../data/expense';
import { Maintenance } from '../../data/maintenance';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceService } from '../../service/maintenance.service';
import { ExpenseService } from '../../service/expense.service';

@Component({
  selector: 'app-maintenance-edit',
  templateUrl: './maintenance-edit.component.html',
  styleUrl: './maintenance-edit.component.scss',
})
export class MaintenanceEditComponent {
  maintenance = new Maintenance();
  expenseList: Expense[] = [];
  bikeId: number = 0;

  public maintenanceForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    mileage: new UntypedFormControl(''),
    date: new UntypedFormControl(''),
    expenseIds: new UntypedFormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private maintenanceService: MaintenanceService,
    private expenseService: ExpenseService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(
        this.route.snapshot.paramMap.get('id') as string
      );
      this.bikeId = id;

      this.maintenanceForm = this.formBuilder.group(this.maintenance);
    }
    this.expenseService.getListByBike(this.bikeId).subscribe((expenses) => {
      this.expenseList = expenses;
    });
  }

  async save(formData: any) {
    this.maintenance = Object.assign(formData);
    this.maintenance.bikeId = this.bikeId;
    this.maintenanceService.save(this.maintenance).subscribe({
      next: () => {
        this.back();
      },
    });
  }

  back() {
    this.router.navigate(['bike/info', this.bikeId]);
  }
}
