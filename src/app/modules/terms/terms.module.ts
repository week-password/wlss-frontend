import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { UserAgreementComponent } from './pages/user-agreement/user-agreement.component';
import { TermsRoutingModule } from './terms-routing.module';

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    UserAgreementComponent
  ],
  imports: [
    CommonModule,
    TermsRoutingModule
  ]
})
export class TermsModule { }
