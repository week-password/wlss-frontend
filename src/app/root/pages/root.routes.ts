import { Routes } from '@angular/router';

import { AuthRoutes } from '@auth/pages';
import { ProfileRoutes } from '@profile/pages';
import { ProfilesRoutes } from '@profiles/pages';
import { authGuard, sessionGuard } from '@root/guards';
import { NotFoundPage } from '@root/pages/not-found';
import { UnavailablePage } from '@root/pages/unavailable';
import { TermsRoutes } from '@terms/pages';

export const RootRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
  { path: '', loadChildren: () => AuthRoutes, canActivateChild: [authGuard] },
  { path: 'profile', loadChildren: () => ProfileRoutes, canActivate: [sessionGuard] },
  { path: 'profiles', loadChildren: () => ProfilesRoutes, canActivate: [sessionGuard] },
  { path: 'terms', loadChildren: () => TermsRoutes },
  { path: 'unavailable', component: UnavailablePage },
  { path: '404', component: NotFoundPage },
  { path: '**', component: NotFoundPage },
];
