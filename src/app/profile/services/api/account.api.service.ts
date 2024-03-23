import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TGetAccountResponse } from '@profile/models/api';

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  constructor(private readonly http: HttpClient) {}

  getAccount(login: string): Observable<TGetAccountResponse> {
    return this.http.get<TGetAccountResponse>(`/accounts/logins/${login}`);
  }
}
