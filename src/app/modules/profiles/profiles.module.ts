import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';

import { ProfilesFilterComponent } from './components/profiles-filter';
import { ProfilesComponent } from './pages/profiles';
import { ProfilesRoutingModule } from './profiles-routing.module';

@NgModule({
  declarations: [
    ProfilesComponent,
    ProfilesFilterComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    SharedModule,
  ]
})
export class ProfilesModule { }
