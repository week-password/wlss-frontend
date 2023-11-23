import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivacyPolicyComponent } from './pages/privacy-policy';
import { UserAgreementComponent } from './pages/user-agreement';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'privacy-policy',
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'user-agreement',
    component: UserAgreementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsRoutingModule { }
