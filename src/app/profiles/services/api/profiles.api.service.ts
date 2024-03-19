import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TGetProfilesResponse } from '@profiles/models/api';

@Injectable({ providedIn: 'root' })
export class ProfilesApiService {
  constructor(private http: HttpClient) { }

  getProfiles(): Observable<TGetProfilesResponse> {
    return this.http.get<TGetProfilesResponse>('/profiles');
  }
}
