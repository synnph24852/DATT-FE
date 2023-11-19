import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../@types';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private API_Url = 'http://localhost:8000/api/categories';
  constructor(private http: HttpClient) {}
  getAll(): Observable<{ data: ICategory[] }> {
    return this.http.get<{ data: ICategory[] }>(this.API_Url);
  }
  getBySlug(slug:string): Observable<{ data: ICategory[] }> {
    return this.http.get<{ data: ICategory[] }>(this.API_Url+'/get-slug/'+slug);
  }
  getById(id: string): Observable<{ data: ICategory }> {
    return this.http.get<{ data: ICategory }>(`${this.API_Url}/${id}`);
  }
  delete(id: number | string): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.API_Url}/` + id);
  }
  create(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.API_Url}`, category);
  }
  update(category: any): Observable<ICategory> {
    const { id, ...data } = category;
    return this.http.put<ICategory>(`${this.API_Url}/${id}`, data);
  }
}
