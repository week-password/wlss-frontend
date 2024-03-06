import { LY_THEME, LY_THEME_NAME, LyTheme2 } from '@alyle/ui';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideAngularSvgIcon } from 'angular-svg-icon';

import { requestUrlInterceptor } from '@core/interceptors';
import { RootRoutes } from '@root/pages';
import { RootPage } from '@root/pages/root';
import { environment } from 'src/environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RootPage, {
  providers: [
    importProvidersFrom(BrowserModule, MatDialogModule, MatSnackBarModule),
    [LyTheme2],
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    provideAngularSvgIcon(),
    provideAnimations(),
    provideHttpClient(withInterceptors([requestUrlInterceptor])),
    provideRouter(RootRoutes),
  ],

}).catch((err: unknown) => console.error(err));
