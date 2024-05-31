import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../service/expense.service';
import { Expense } from '../../data/expense';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
})
export class ExpenseListComponent implements OnInit {
  expenseList: Expense[] = [];
  displayedColumns: string[] = [
    'date',
    'name',
    'amount',
    'expenseType',
    'actions',
  ];
  bikeId: number = 1;
  constructor(
    private expenseService: ExpenseService,
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
    this.expenseService.getListByBike(this.bikeId).subscribe((expenses) => {
      this.expenseList = expenses;
    });
  }

  create() {
    this.router.navigate(['expense/create', this.bikeId]);
  }

  delete(id: number) {
    this.expenseService.delete(id).subscribe({
      next: () => {
        this.reloadData();
      },
    });
  }
}
