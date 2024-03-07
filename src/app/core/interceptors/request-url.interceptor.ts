import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export const requestUrlInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  if (request.url.startsWith('assets')) {
    return next(request);
  }
  return next(request.clone({
    url: `${environment.bff.host}:${environment.bff.port}${environment.bff.url}${request.url}`,
  }));
};
