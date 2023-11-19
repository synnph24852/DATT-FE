import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../@types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  private API_Url = 'http://localhost:8000/api';

  getAll(params?: any): Observable<{ data: IOrder[] }> {
    return this.http.get<{ data: IOrder[] }>(`${this.API_Url}/orders`, {
      params,
    });
  }

  getById(id: string): Observable<{ data: IOrder }> {
    return this.http.get<{ data: IOrder }>(`${this.API_Url}/orders/${id}`);
  }
  delete(id: number | string): Observable<IOrder> {
    return this.http.delete<IOrder>(`${this.API_Url}/orders/` + id);
  }
  create(book: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.API_Url}/orders`, book);
  }
  update(data: any): Observable<IOrder> {
    const { id, ...book } = data;
    return this.http.put<IOrder>(`${this.API_Url}/orders/${id}`, book);
  }
}
