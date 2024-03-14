import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TUploadFileResponse } from '@core/models/api';

@Injectable({ providedIn: 'root' })
export class FilesApiService {
  constructor(private http: HttpClient) { }

  uploadFile(file: FormData): Observable<TUploadFileResponse> {
    return this.http.post<TUploadFileResponse>(`/files`, file);
  }
}
