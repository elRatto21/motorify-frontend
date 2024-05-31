import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from '../data/bike';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  readonly type = 'bike';
  constructor(private httpClient: HttpClient) {}

  public getList(): Observable<Bike[]> {
    return this.httpClient.get<Bike[]>(environment.backendUrl + this.type);
  }

  public getListByUser(user: string): Observable<Bike[]> {
    return this.httpClient.get<Bike[]>(
      environment.backendUrl + this.type + `?user=${user}`
    );
  }

  public getOne(id: number): Observable<Bike> {
    return this.httpClient.get<Bike>(
      environment.backendUrl + this.type + `/${id}`
    );
  }

  public save(bike: Bike): Observable<Bike> {
    return this.httpClient.post<Bike>(environment.backendUrl + this.type, bike);
  }

  public update(bike: Bike): Observable<Bike> {
    return this.httpClient.put<Bike>(
      environment.backendUrl + this.type + `/${bike.id}`,
      bike
    );
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.httpClient.delete<string>(
      environment.backendUrl + this.type + `/${id}`,
      { observe: 'response' }
    );
  }
}
