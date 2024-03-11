import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { SessionStateService } from '@auth/services/state';

export const sessionInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const sessionStateService = inject(SessionStateService);
  const { accessToken } = sessionStateService;
  if(accessToken === null) {
    return next(request);
  }
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` });
  return next(request.clone({ headers }));
};
