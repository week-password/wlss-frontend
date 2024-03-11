import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStateService {
  get accessToken(): string | null {
    return localStorage.getItem('access-token');
  }
  get refreshToken(): string | null {
    return localStorage.getItem('refresh-token');
  }
  get sessionId(): string | null {
    return localStorage.getItem('session-id');
  }
  get accountId(): number | null {
    const accountId = localStorage.getItem('account-id');
    return accountId ? Number(accountId) : null;
  }
  get isLoggedIn(): boolean {
    return this.accessToken !== null;
  }

  setAccessToken(accessToken: string | null): void {
    accessToken ?
      localStorage.setItem('access-token', accessToken) :
      localStorage.removeItem('access-token');
  }
  setRefreshToken(refreshToken: string | null): void {
    refreshToken ?
      localStorage.setItem('refresh-token', refreshToken) :
      localStorage.removeItem('refresh-token');
  }
  setSessionId(sessionId: string | null): void {
    sessionId ?
      localStorage.setItem('session-id', sessionId) :
      localStorage.removeItem('session-id');
  }
  setAccountId(accountId: number | null): void {
    accountId ?
      localStorage.setItem('account-id', accountId.toString()) :
      localStorage.removeItem('account-id');
  }
}
