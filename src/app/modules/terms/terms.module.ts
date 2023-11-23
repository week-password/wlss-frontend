import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrivacyPolicyComponent } from './pages/privacy-policy';
import { UserAgreementComponent } from './pages/user-agreement';
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
