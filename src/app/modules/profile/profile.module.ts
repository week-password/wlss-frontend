import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/modules/shared/shared.module';

import { ProfileBlockComponent } from './components/profile-block/profile-block.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { ShortProfileCardComponent } from './components/short-profile-card/short-profile-card.component';
import { WishFormComponent } from './components/wish-form/wish-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileBlockComponent,
    ProfileComponent,
    ProfileSettingsComponent,
    ShortProfileCardComponent,
    WishFormComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ]
})
export class ProfileModule { }
