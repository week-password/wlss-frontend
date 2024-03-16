import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TRefreshTokensResponse, TSigninRequest, TSigninResponse, TSignupRequest } from '@auth/models/api';
import { refreshRequestTokens } from '@core/interceptors';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private http: HttpClient) { }

  signup(signupData: TSignupRequest): Observable<void> {
    return this.http.post<void>('/accounts', signupData);
  }

  signin(signinData: TSigninRequest): Observable<TSigninResponse> {
    return this.http.post<TSigninResponse>('/accounts/sessions', signinData);
  }

  signout(accountId: number, sessionId: string): Observable<void> {
    return this.http.delete<void>(`/accounts/${accountId}/sessions/${sessionId}`);
  }

  refreshTokens(accountId: number, sessionId: string, refreshToken: string): Observable<TRefreshTokensResponse> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${refreshToken}` });
    const context = new HttpContext().set(refreshRequestTokens, false);
    return this.http.post<TRefreshTokensResponse>(`/accounts/${accountId}/sessions/${sessionId}/tokens`, {}, { headers, context });
  }
}
