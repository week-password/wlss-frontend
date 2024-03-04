import { Routes } from '@angular/router';

import { PrivacyPolicyPage } from './privacy-policy';
import { UserAgreementPage } from './user-agreement';

export const TermsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'privacy-policy',
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyPage,
  },
  {
    path: 'user-agreement',
    component: UserAgreementPage,
  },
];
