import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from '@modules/auth';
import { ProfileModule } from '@modules/profile';
import { ProfilesModule } from '@modules/profiles';
import { TermsModule } from '@modules/terms';
import { NotFoundComponent } from '@shared/components/not-found';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: '',
    loadChildren: () => AuthModule,
  },
  {
    path: 'profile',
    loadChildren: () => ProfileModule,
  },
  {
    path: 'profiles',
    loadChildren: () => ProfilesModule,
  },
  {
    path: 'terms',
    loadChildren: () => TermsModule,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
