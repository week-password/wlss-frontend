import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';

import { SnackbarComponent } from '@core/components/snackbar';
import { EHttpError } from '@core/models/api';
import {
  EMatSnackbarHPosition,
  EMatSnackbarVPosition,
  EPosition,
  ESnackbarView,
  ETextPosition,
  TSnackbarData,
} from '@core/models/client';

export const showServerError = new HttpContextToken(() => true);

export const serverErrorInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const snackBar = inject(MatSnackBar);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== EHttpError.internalServerError) {
        return throwError(() => error);
      }
      if (request.context.get(showServerError) === false) {
        return throwError(() => error);
      }
      const data: TSnackbarData = {
        width: 260,
        catPosition: EPosition.top,
        textAlign: ETextPosition.right,
        view: ESnackbarView.error,
        text: 'Произошла непредвиденная ошибка',
      };
      snackBar.openFromComponent(SnackbarComponent, {
        data,
        horizontalPosition: EMatSnackbarHPosition.end,
        verticalPosition: EMatSnackbarVPosition.top,
        duration: 5000,
      });
      return throwError(() => error);
    }),
  );
};
