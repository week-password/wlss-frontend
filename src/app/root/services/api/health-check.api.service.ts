import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { showServerError } from '@core/interceptors';

@Injectable({ providedIn: 'root' })
export class HealthCheckApiService {
  constructor(private http: HttpClient) { }

  getHealth(): Observable<void> {
    const context = new HttpContext().set(showServerError, false);
    return this.http.get<void>('/health', { context });
  }
}
