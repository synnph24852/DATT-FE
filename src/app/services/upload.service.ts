import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private API_Url = 'http://localhost:8000/api/images';
  constructor(private http: HttpClient) {}

  uploadFile(files: any): Observable<any> {
    const formData = new FormData();

    [...files].forEach((file: any, index: number) => {
      formData.append(`images`, file);
    });
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    return this.http.post<any>(this.API_Url + '/upload', formData, { headers });
  }
}
