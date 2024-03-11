import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TSigninRequest, TSigninResponse, TSignupRequest } from '@auth/models/api';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private http: HttpClient) { }

  signup(signupData: TSignupRequest): Observable<void> {
    return this.http.post<void>('/accounts', signupData);
  }

  signin(signinData: TSigninRequest): Observable<TSigninResponse> {
    return this.http.post<TSigninResponse>('/accounts/sessions', signinData);
  }
}
