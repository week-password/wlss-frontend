import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TSignupRequest } from '@auth/models/api';

@Injectable({ providedIn: 'root' })
export class SignupApiService {
  constructor(private http: HttpClient) { }

  matchAccountLogin(login: string): Observable<void> {
    return this.http.post<void>('/accounts/logins/match', { login });
  }

  matchAccountEmail(email: string): Observable<void> {
    return this.http.post<void>('/accounts/emails/match', { email });
  }

  signup(signupData: TSignupRequest): Observable<void> {
    return this.http.post<void>('/accounts', signupData);
  }
}
