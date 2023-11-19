import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../@types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  singup(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`http://localhost:8000/auth/register`, user);
  }
  singin(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`http://localhost:8000/auth/login`, user);
  }
  getAll(): Observable<{ data: IUser[] }> {
    return this.http.get<{ data: IUser[] }>(`http://localhost:8000/api/users`);
  }
  delete(id: number | string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `http://localhost:8000/api/users/` + id
    );
  }
}
