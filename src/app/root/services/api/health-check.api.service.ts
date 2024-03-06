import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HealtCheckApiService {
  constructor(private http: HttpClient) { }

  getHealth(): Observable<void> {
    return this.http.get<void>('/health');
  }
}
