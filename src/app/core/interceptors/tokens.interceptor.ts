import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, filter, first, Observable, switchMap, throwError } from 'rxjs';

import { AuthService } from '@auth/services/client';
import { SessionStateService } from '@auth/services/state';
import { EHttpError } from '@core/models/api';

export const refreshRequestTokens = new HttpContextToken(() => true);

export const tokensInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const sessionStateService = inject(SessionStateService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== EHttpError.forbidden) {
        return throwError(() => error);
      }
      if (request.context.get(refreshRequestTokens) === false) {
        return throwError(() => error);
      }
      if (sessionStateService.refreshingInProgress.value) {
        return sessionStateService.refreshingInProgress.pipe(
          filter((refreshingInProgress: boolean) => !refreshingInProgress),
          first(),
          switchMap(() => next(request)),
        );
      }
      sessionStateService.setRefreshingInProgress(true);
      return authService.refreshTokens().pipe(
        switchMap(() => {
          sessionStateService.setRefreshingInProgress(false);
          return next(request);
        }),
        catchError((error: HttpErrorResponse) => {
          sessionStateService.setRefreshingInProgress(false);
          router.navigate(['signin']);
          return throwError(() => error);
        }),
      );
    }),
  );
};
