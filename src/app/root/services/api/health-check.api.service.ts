import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HealthCheckApiService {
  constructor(private http: HttpClient) { }

  getHealth(): Observable<void> {
    return this.http.get<void>('/health');
  }
}
