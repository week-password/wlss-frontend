import { Routes } from '@angular/router';

import { profileGuard } from '@profile/guards';

import { ProfilePage } from './profile';

export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
  {
    path: ':login',
    component: ProfilePage,
    canActivate: [profileGuard],
  },
];
