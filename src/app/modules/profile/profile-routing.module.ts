import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { profileGuard } from 'src/app/modules/profile/core/guards';

import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: ':login',
    component: ProfileComponent,
    canActivate: [profileGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
