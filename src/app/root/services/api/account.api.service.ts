import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TGetAccountsRequest, TGetAccountsResponse } from '@root/models/api';

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  constructor(private http: HttpClient) {}

  getAccounts(params: TGetAccountsRequest): Observable<TGetAccountsResponse> {
    return this.http.get<TGetAccountsResponse>('/accounts', { params });
  }
}
