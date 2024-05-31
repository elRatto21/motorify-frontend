import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BikeListComponent } from './bike-list.component';
import { BikeService } from '../../service/bike.service';
import { Router } from '@angular/router';
import { AppAuthService } from '../../service/app.auth.service';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

class MockBikeService {
  getList() {
    return of([{ id: 1, manufacturer: { name: 'Yamaha' }, model: 'YZF-R1' }]);
  }
  getListByUser(username: string) {
    return of([{ id: 2, manufacturer: { name: 'Honda' }, model: 'CBR600RR', user: username }]);
  }
  delete(id: number) {
    return of({id: id});
  }
}

class MockAppAuthService {
  getRoles() {
    return of(['user']);
  }
  useraliasObservable = of('user');
}

describe('BikeListComponent', () => {
  let component: BikeListComponent;
  let fixture: ComponentFixture<BikeListComponent>;
  let bikeService: BikeService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BikeListComponent],
      providers: [
        { provide: BikeService, useClass: MockBikeService },
        { provide: AppAuthService, useClass: MockAppAuthService },
      ],
      imports: [MatIconModule, MatTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeListComponent);
    component = fixture.componentInstance;
    bikeService = TestBed.inject(BikeService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isAdmin based on roles', () => {
    expect(component.isAdmin).toBeFalse();
  });

  it('should initialize username', () => {
    expect(component.username).toBe('user');
  });

  it('should load data based on isAdmin status', () => {
    component.isAdmin = true;
    component.reloadData();
    expect(component.data.length).toBe(1);
    expect(component.data[0].model).toBe('YZF-R1');

    component.isAdmin = false;
    component.reloadData();
    expect(component.data.length).toBe(1);
    expect(component.data[0].model).toBe('CBR600RR');
  });

  it('should navigate to edit page', () => {
    spyOn(router, 'navigate');
    component.edit(1);
    expect(router.navigate).toHaveBeenCalledWith(['bike/edit', 1]);
  });

  it('should navigate to info page', () => {
    spyOn(router, 'navigate');
    component.info(1);
    expect(router.navigate).toHaveBeenCalledWith(['bike/info', 1]);
  });

  it('should delete bike and reload data', () => {
    spyOn(bikeService, 'delete').and.callThrough();
    spyOn(component, 'reloadData').and.callThrough();
    component.delete(1);
    expect(bikeService.delete).toHaveBeenCalledWith(1);
    expect(component.reloadData).toHaveBeenCalled();
  });

  it('should navigate to create page', () => {
    spyOn(router, 'navigate');
    component.create();
    expect(router.navigate).toHaveBeenCalledWith(['bike/create']);
  });
});
