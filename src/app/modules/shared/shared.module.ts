import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { OverlayModule } from '@angular/cdk/overlay';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { ButtonComponent } from './components/button/button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ErrorComponent } from './components/error/error.component';
import { InputComponent } from './components/input/input.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TextareaComponent } from './components/textarea/textarea.component';

const MODULES = [
  AngularSvgIconModule.forRoot(),
  CommonModule,
  FontAwesomeModule,
  FormsModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  OverlayModule,
  ReactiveFormsModule,
  RouterModule,
];

const COMPONENTS = [
  ButtonComponent,
  DialogComponent,
  ErrorComponent,
  InputComponent,
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
