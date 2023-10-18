import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/modules/shared/shared.module';

import { ProfilesFilterComponent } from './components/profiles-filter/profiles-filter.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
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
