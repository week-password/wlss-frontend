import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignupApiService {
  constructor(private http: HttpClient) { }

  matchAccountLogin(login: string): Observable<void> {
    return this.http.post<void>('/accounts/logins/match', { login });
  }

  matchAccountEmail(email: string): Observable<void> {
    return this.http.post<void>('/accounts/emails/match', { email });
  }
}
