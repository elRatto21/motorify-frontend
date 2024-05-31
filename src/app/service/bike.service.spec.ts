import { TestBed } from '@angular/core/testing';

import { BikeService } from './bike.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { Bike } from '../data/bike';

describe('BikeService', () => {
  let service: BikeService;
  let httpSpy: Spy<HttpClient>;

  const fakeBikes: Bike[] = [
    {
      id: 1,
      manufacturer: {
        id: 1,
        name: 'KTM',
        country: 'Austria',
      },
      model: 'LC4 640',
      horsepower: 50,
      year: 2001,
      mileage: 28000,
      weight: 150,
      bikeType: 'SUPERMOTO',
      username: 'user',
    },
    {
      id: 2,
      manufacturer: {
        id: 1,
        name: 'KTM',
        country: 'Austria',
      },
      model: 'Superduke 1290R',
      horsepower: 180,
      year: 2023,
      mileage: 2000,
      weight: 180,
      bikeType: 'NAKEDBIKE',
      username: 'user',
    },
    {
      id: 1,
      manufacturer: {
        id: 1,
        name: 'KTM',
        country: 'Austria',
      },
      model: 'EXC 500',
      horsepower: 68,
      year: 2018,
      mileage: 4000,
      weight: 110,
      bikeType: 'ENDURO',
      username: 'admin',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
      ],
    });
    service = TestBed.inject(BikeService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of bikes', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeBikes);
    service.getList().subscribe({
      next: (departments) => {
        expect(departments).toHaveSize(fakeBikes.length);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should return a list of bikes by user', (done: DoneFn) => {
    httpSpy.get.and.nextWith(
      fakeBikes.filter((bike) => bike.username === 'user')
    );
    service.getListByUser('user').subscribe({
      next: (departments) => {
        expect(departments).toHaveSize(
          fakeBikes.filter((bike) => bike.username === 'user').length
        );
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should return one bike', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeBikes[1]);
    service.getOne(1).subscribe({
      next: (bike) => {
        expect(bike).toEqual(fakeBikes[1]);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should create a new bike', (done: DoneFn) => {
    const newBike: Bike = {
      id: 4,
      manufacturer: {
        id: 2,
        name: 'Yamaha',
        country: 'Japan',
      },
      model: 'XT 250',
      horsepower: 18,
      year: 1981,
      mileage: 47000,
      weight: 120,
      bikeType: 'ENDURO',
      username: 'user',
    };
    httpSpy.post.and.nextWith(newBike);
    service.save(newBike).subscribe({
      next: (bike) => {
        expect(bike).toEqual(newBike);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an bike', (done: DoneFn) => {
    const bike = fakeBikes[0];
    bike.model = 'LC4 660';
    httpSpy.put.and.nextWith(bike);
    service.update(bike).subscribe({
      next: (bike) => {
        expect(bike.model).toEqual('LC4 660');
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing bike', (done: DoneFn) => {
    httpSpy.delete.and.nextWith(
      new HttpResponse({
        status: 200,
      })
    );
    service.delete(1).subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});
