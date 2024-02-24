import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';

import { ProfileBlockComponent } from './components/profile-block';
import { ShortProfileCardComponent } from './components/short-profile-card';
import { WishActionsComponent } from './components/wish-actions';
import { WishFormComponent } from './components/wish-form';
import { WishListComponent } from './components/wish-list';
import { ProfileComponent } from './pages/profile';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileBlockComponent,
    ProfileComponent,
    ShortProfileCardComponent,
    WishActionsComponent,
    WishFormComponent,
    WishListComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ]
})
export class ProfileModule { }
