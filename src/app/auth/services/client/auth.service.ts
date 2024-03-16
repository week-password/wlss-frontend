import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

import { TRefreshTokensResponse, TSigninRequest, TSigninResponse } from '@auth/models/api';
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

  signout(): Observable<void> {
    const { accountId, sessionId } = this.sessionStateService;
    if (!accountId || !sessionId) {
      this.removeSessionState();
      return of(undefined);
    }
    return this.authApiService.signout(accountId, sessionId).pipe(
      switchMap(() => {
        this.removeSessionState();
        return of(undefined);
      }),
    );
  }

  refreshTokens(): Observable<void> {
    const { accountId, sessionId, refreshToken } = this.sessionStateService;
    if (!accountId || !sessionId || !refreshToken) {
      this.removeSessionState();
      return of(undefined);
    }
    this.sessionStateService.setAccessToken(null);
    return this.authApiService.refreshTokens(accountId, sessionId, refreshToken).pipe(
      switchMap((tokens: TRefreshTokensResponse) => {
        this.sessionStateService.setAccessToken(tokens.accessToken);
        this.sessionStateService.setRefreshToken(tokens.refreshToken);
        return of(undefined);
      }),
      catchError((error: HttpErrorResponse) => {
        this.removeSessionState();
        return throwError(() => error);
      }),
    );
  }

  private removeSessionState(): void {
    this.sessionStateService.setAccessToken(null);
    this.sessionStateService.setRefreshToken(null);
    this.sessionStateService.setSessionId(null);
    this.sessionStateService.setAccountId(null);
  }
}
