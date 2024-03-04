import { Routes } from '@angular/router';

import { AuthRoutes } from '@auth/pages';
import { ProfileRoutes } from '@profile/pages';
import { ProfilesRoutes } from '@profiles/pages';
import { NotFoundPage } from '@root/pages/not-found';
import { TermsRoutes } from '@terms/pages';

export const RootRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: '',
    loadChildren: () => AuthRoutes,
  },
  {
    path: 'profile',
    loadChildren: () => ProfileRoutes,
  },
  {
    path: 'profiles',
    loadChildren: () => ProfilesRoutes,
  },
  {
    path: 'terms',
    loadChildren: () => TermsRoutes,
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
