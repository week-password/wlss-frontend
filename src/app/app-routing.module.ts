import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from 'src/app/modules/auth/auth.module';
import { ProfileModule } from 'src/app/modules/profile/profile.module';
import { ProfilesModule } from 'src/app/modules/profiles/profiles.module';
import { NotFoundComponent } from 'src/app/modules/shared/components/not-found/not-found.component';
import { TermsModule } from 'src/app/modules/terms/terms.module';

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
