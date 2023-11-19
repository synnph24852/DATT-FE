import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../@types';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  private API_Url = 'http://localhost:8000/api';

  searchBook(search: string): Observable<{ data: IBook[] }> {
    return this.http.get<{ data: IBook[] }>(
      `${this.API_Url}/search?q=` + search
    );
  }
}
