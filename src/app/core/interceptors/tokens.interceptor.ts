import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { AuthService } from '@auth/services/client';
import { EHttpError } from '@core/models/api';

export const refreshRequestTokens = new HttpContextToken(() => true);

export const tokensInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== EHttpError.forbidden) {
        return throwError(() => error);
      }
      if (request.context.get(refreshRequestTokens) === false) {
        return throwError(() => error);
      }
      return authService.refreshTokens().pipe(
        switchMap(() => next(request)),
        catchError((error: HttpErrorResponse) => {
          router.navigate(['signin']);
          return throwError(() => error);
        }),
      );
    }),
  );
};
