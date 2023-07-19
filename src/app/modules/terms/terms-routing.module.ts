import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { UserAgreementComponent } from './pages/user-agreement/user-agreement.component';

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
