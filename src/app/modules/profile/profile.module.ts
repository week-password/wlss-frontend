import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/modules/shared/shared.module';

import { ProfileBlockComponent } from './components/profile-block/profile-block.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { WishFormComponent } from './components/wish-form/wish-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileBlockComponent,
    ProfileCardComponent,
    ProfileComponent,
    WishFormComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ]
})
export class ProfileModule { }
