import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TGetProfileResponse, TUpdateProfileRequest, TUpdateProfileResponse } from '@profile/models/api';

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  constructor(private http: HttpClient) { }

  getProfile(accountId: number): Observable<TGetProfileResponse> {
    return this.http.get<TGetProfileResponse>(`/accounts/${accountId}/profile`);
  }

  updateProfile(accountId: number, profile: TUpdateProfileRequest): Observable<TUpdateProfileResponse> {
    return this.http.put<TUpdateProfileResponse>(`/accounts/${accountId}/profile`, profile);
  }
}
