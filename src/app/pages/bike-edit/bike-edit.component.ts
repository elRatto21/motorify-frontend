import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Bike } from '../../data/bike';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeService } from '../../service/bike.service';
import { ManufacturerService } from '../../service/manufacturer.service';
import { Manufacturer } from '../../data/manufacturer';
import { AppAuthService } from '../../service/app.auth.service';

@Component({
  selector: 'app-bike-edit',
  templateUrl: './bike-edit.component.html',
  styleUrl: './bike-edit.component.scss',
})
export class BikeEditComponent {
  bike = new Bike();
  manufacturerList: Manufacturer[] = [];
  bikeTypeList: string[] = [
    'NAKEDBIKE',
    'SUPERSPORTS',
    'SUPERMOTO',
    'ENDURO',
    'CHOPPER',
    'TOURING',
  ];
  title: string = '';
  username: string = '';

  public bikeForm = new UntypedFormGroup({
    manufacturer: new UntypedFormControl(''),
    model: new UntypedFormControl(''),
    bikeType: new UntypedFormControl(''),
    year: new UntypedFormControl(''),
    horsepower: new UntypedFormControl(''),
    weight: new UntypedFormControl(''),
    mileage: new UntypedFormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private bikeService: BikeService,
    private manufacturerService: ManufacturerService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AppAuthService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(
        this.route.snapshot.paramMap.get('id') as string
      );

      this.bikeService.getOne(id).subscribe((obj) => {
        this.bike = obj;
        this.bikeForm = this.formBuilder.group(obj);
        this.title = 'Edit Bike';
      });
    } else {
      this.bikeForm = this.formBuilder.group(this.bike);
      this.title = 'Create Bike';
    }
    this.manufacturerService.getList().subscribe((manufacturers) => {
      this.manufacturerList = manufacturers;
    });
    this.authService.useraliasObservable.subscribe((alias) => {
      this.username = alias;
    });
  }

  async save(formData: any) {
    this.bike = Object.assign(formData);
    this.bike.username = this.username;
    if (this.bike.id) {
      this.bikeService.update(this.bike).subscribe({
        next: () => {
          this.back();
        },
      });
    } else {
      this.bikeService.save(this.bike).subscribe({
        next: () => {
          this.back();
        },
      });
    }
  }

  back() {
    this.router.navigate(['bike']);
  }
}
