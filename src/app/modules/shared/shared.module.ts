import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { OverlayModule } from '@angular/cdk/overlay';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { AuthorizedUserComponent } from './components/authorized-user/authorized-user.component';
import { ButtonComponent } from './components/button/button.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { LogoComponent } from './components/logo/logo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TextareaComponent } from './components/textarea/textarea.component';

const MODULES = [
  AngularSvgIconModule.forRoot(),
  CommonModule,
  FontAwesomeModule,
  FormsModule,
  HttpClientModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  OverlayModule,
  ReactiveFormsModule,
  RouterModule,
];

const COMPONENTS = [
  AuthorizedUserComponent,
  ButtonComponent,
  CookieBannerComponent,
  DialogComponent,
  ErrorComponent,
  FooterComponent,
  HeaderComponent,
  InputComponent,
  LogoComponent,
  NotFoundComponent,
  OverlayComponent,
  SnackbarComponent,
  TextareaComponent,
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DIRECTIVES: any = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PIPES: any = [];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...MODULES,
    ...PIPES,
  ],
  providers: []
})
export class SharedModule { }
