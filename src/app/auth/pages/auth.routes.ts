import { Routes } from '@angular/router';

import { SigninPage } from './signin';
import { SignupPage } from './signup';

export const AuthRoutes: Routes = [
  {
    path: 'signin',
    component: SigninPage,
  },
  {
    path: 'signup',
    component: SignupPage,
  },
];
