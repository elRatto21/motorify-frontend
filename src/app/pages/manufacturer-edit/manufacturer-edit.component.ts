import { Component } from '@angular/core';
import { Manufacturer } from '../../data/manufacturer';
import { ActivatedRoute, Router } from '@angular/router';
import { ManufacturerService } from '../../service/manufacturer.service';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-manufacturer-edit',
  templateUrl: './manufacturer-edit.component.html',
  styleUrl: './manufacturer-edit.component.scss',
})
export class ManufacturerEditComponent {
  manufacturer = new Manufacturer();

  title: string = '';

  public manufacturerForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    country: new UntypedFormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private manufacturerService: ManufacturerService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(
        this.route.snapshot.paramMap.get('id') as string
      );

      this.manufacturerService.getOne(id).subscribe((obj) => {
        this.manufacturer = obj;
        this.manufacturerForm = this.formBuilder.group(obj);
        this.title = 'Edit Manufacturer';
      });
    } else {
      this.manufacturerForm = this.formBuilder.group(this.manufacturer);
      this.title = 'Create Manufacturer';
    }
  }

  async save(formData: any) {
    this.manufacturer = Object.assign(formData);

    if (this.manufacturer.id) {
      this.manufacturerService.update(this.manufacturer).subscribe({
        next: () => {
          this.back();
        },
      });
    } else {
      this.manufacturerService.save(this.manufacturer).subscribe({
        next: () => {
          this.back();
        },
      });
    }
  }

  back() {
    this.router.navigate(['manufacturer']);
  }
}
