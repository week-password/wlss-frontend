import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';

import { SignupApiService } from '@auth/services/api';
import { EHttpError } from '@core/models/api';

const availableStatus = EHttpError.notFound;

@Injectable({ providedIn: 'root' })
export class SignupService {
  constructor(private signupApiService: SignupApiService) { }

  isLoginUnavailable(login: string): Observable<boolean> {
    return this.signupApiService.matchAccountLogin(login).pipe(
      switchMap(() => of(true)),
      catchError((error: HttpErrorResponse) => of(error.status !== availableStatus)),
    );
  }

  isEmailUnavailable(email: string): Observable<boolean> {
    return this.signupApiService.matchAccountEmail(email).pipe(
      switchMap(() => of(true)),
      catchError((error: HttpErrorResponse) => of(error.status !== availableStatus)),
    );
  }
}
