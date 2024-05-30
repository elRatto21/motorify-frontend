import { Injectable } from '@angular/core';
import { Manufacturer } from '../data/manufacturer';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService {
  readonly type = 'manufacturer';

  constructor(private httpClient: HttpClient) {}

  public getList(): Observable<Manufacturer[]> {
    return this.httpClient.get<Manufacturer[]>(
      environment.backendUrl + this.type
    );
  }

  public getOne(id: number): Observable<Manufacturer> {
    return this.httpClient.get<Manufacturer>(
      environment.backendUrl + this.type + `/${id}`
    );
  }

  public save(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.httpClient.post<Manufacturer>(
      environment.backendUrl + this.type,
      manufacturer
    );
  }

  public update(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.httpClient.put<Manufacturer>(
      environment.backendUrl + this.type + `/${manufacturer.id}`,
      manufacturer
    );
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.httpClient.delete<string>(
      environment.backendUrl + this.type + `/${id}`,
      { observe: 'response' }
    );
  }
}
