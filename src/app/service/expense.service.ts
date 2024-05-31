import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../data/expense';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  readonly type = 'expense';
  constructor(private httpClient: HttpClient) {}

  public getListByBike(id: number): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(
      environment.backendUrl + this.type + `?bike=${id}`
    );
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.httpClient.delete<string>(
      environment.backendUrl + this.type + `/${id}`,
      { observe: 'response' }
    );
  }
}
