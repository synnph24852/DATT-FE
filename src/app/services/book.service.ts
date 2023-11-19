import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from '../@types';

@Injectable({
  providedIn: 'root',
})
export class Bookservice {
  constructor(private http: HttpClient) {}

  private API_Url = 'http://localhost:8000/api';

  getAll(params?: any): Observable<{ data: IBook[] }> {
    return this.http.get<{ data: IBook[] }>(`${this.API_Url}/books`, {
      params,
    });
  }
  getBySlug(slug: string): Observable<{ data: IBook }> {
    return this.http.get<{ data: IBook }>(
      `${this.API_Url}/books/get-slug/${slug}`
    );
  }
  getById(id: string): Observable<{ data: IBook }> {
    return this.http.get<{ data: IBook }>(`${this.API_Url}/books/${id}`);
  }
  delete(id: number | string): Observable<IBook> {
    return this.http.delete<IBook>(`${this.API_Url}/books/` + id);
  }
  create(Bookt: IBook): Observable<IBook> {
    return this.http.post<IBook>(`${this.API_Url}/books`, Bookt);
  }
  update(data: any): Observable<IBook> {
    const { id, ...Bookt } = data;
    return this.http.put<IBook>(`${this.API_Url}/books/${id}`, Bookt);
  }

  getByCategory(categoryId: string): Observable<{ data: IBook[] }> {
    return this.http.get<{ data: IBook[] }>(
      `${this.API_Url}?categoryId=${categoryId}`
    );
  }
  // searchBooks(keyword: string):  Observable<{data:IBook[]}> {
  //   return this.http.get<{data:IBook[]}>(`${this.API_Url}/books?search=${keyword}`);
  // }
}
