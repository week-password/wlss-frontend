import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { TSigninRequest, TSigninResponse } from '@auth/models/api';
import { TSigninData, TSignupData } from '@auth/models/client';
import { AuthApiService } from '@auth/services/api';
import { SessionStateService } from '@auth/services/state';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private authApiService: AuthApiService,
    private sessionStateService: SessionStateService,
  ) { }

  signup(signupData: TSignupData): Observable<void> {
    const {
      account: { confirmPassword, ...account },
      profile,
    } = signupData;
    return this.authApiService.signup({ account, profile });
  }

  signin(signinData: TSigninData): Observable<void> {
    const signinRequestData: TSigninRequest = {
      email: signinData.login.includes('@') ? signinData.login : null,
      login: signinData.login.includes('@') ? null: signinData.login,
      password: signinData.password,
    };
    return this.authApiService.signin(signinRequestData).pipe(
      switchMap((signinResponse: TSigninResponse) => {
        this.sessionStateService.setAccessToken(signinResponse.tokens.accessToken);
        this.sessionStateService.setRefreshToken(signinResponse.tokens.refreshToken);
        this.sessionStateService.setSessionId(signinResponse.session.id);
        this.sessionStateService.setAccountId(signinResponse.session.accountId);
        return of(undefined);
      }),
    );
  }
}
