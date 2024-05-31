import { Component, OnInit } from '@angular/core';
import { Expense } from '../../data/expense';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../service/expense.service';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrl: './expense-edit.component.scss',
})
export class ExpenseEditComponent implements OnInit {
  expense = new Expense();
  expenseTypeList: string[] = ['PART', 'MAINTENANCE', 'FUEL', 'BILL'];
  title: string = '';
  bikeId: number = 0;

  public expenseForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    amount: new UntypedFormControl(''),
    date: new UntypedFormControl(''),
    expenseType: new UntypedFormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
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

      this.expenseForm = this.formBuilder.group(this.expense);
    }
  }

  save(formData: any) {
    this.expense = Object.assign(formData);
    this.expense.bikeId = this.bikeId;
    this.expenseService.save(this.expense).subscribe({
      next: () => {
        this.back();
      },
    });
  }

  back() {
    this.router.navigate(['bike/info', this.bikeId]);
  }
}
