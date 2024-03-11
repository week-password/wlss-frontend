import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TGetProfileResponse } from '@profile/models/api';

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  constructor(private http: HttpClient) { }

  getProfile(accountId: number): Observable<TGetProfileResponse> {
    return this.http.get<TGetProfileResponse>(`/accounts/${accountId}/profile`);
  }
}
