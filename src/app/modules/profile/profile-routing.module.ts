import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { profileGuard } from '@core/guards';

import { ProfileComponent } from './pages/profile';

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
