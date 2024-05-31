import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../service/bike.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bike } from '../../data/bike';

@Component({
  selector: 'app-bike-info',
  templateUrl: './bike-info.component.html',
  styleUrl: './bike-info.component.scss',
})
export class BikeInfoComponent implements OnInit {
  constructor(
    private bikeService: BikeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  bike: Bike = new Bike();

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(
        this.route.snapshot.paramMap.get('id') as string
      );
      this.bikeService.getOne(id).subscribe((bike) => {
        this.bike = bike;
      });
    }
  }

  edit(id: number) {
    this.router.navigate(['bike/edit', id]);
  }
}
