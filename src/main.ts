import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideAngularSvgIcon } from 'angular-svg-icon';

import { requestUrlInterceptor, sessionInterceptor } from '@core/interceptors';
import { RootRoutes } from '@root/pages';
import { RootPage } from '@root/pages/root';
import { environment } from 'src/environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RootPage, {
  providers: [
    importProvidersFrom(BrowserModule, MatDialogModule, MatSnackBarModule),
    provideAngularSvgIcon(),
    provideAnimations(),
    provideHttpClient(withInterceptors([requestUrlInterceptor, sessionInterceptor])),
    provideRouter(RootRoutes),
  ],

}).catch((err: unknown) => console.error(err));
