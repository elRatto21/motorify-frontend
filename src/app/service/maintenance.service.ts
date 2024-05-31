import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from '../data/maintenance';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  readonly type = 'maintenance';
  constructor(private httpClient: HttpClient) {}

  public getListByBike(id: number): Observable<Maintenance[]> {
    return this.httpClient.get<Maintenance[]>(
      environment.backendUrl + this.type + `?bike=${id}`
    );
  }

  public getOne(id: number): Observable<Maintenance> {
    return this.httpClient.get<Maintenance>(
      environment.backendUrl + this.type + `/${id}`
    );
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.httpClient.delete<string>(
      environment.backendUrl + this.type + `/${id}`,
      { observe: 'response' }
    );
  }

  public save(maintenance: Maintenance): Observable<Maintenance> {
    return this.httpClient.post<Maintenance>(
      environment.backendUrl + this.type,
      maintenance
    );
  }
}
