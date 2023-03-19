import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularSvgIconModule } from 'angular-svg-icon';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  FontAwesomeModule,
  AngularSvgIconModule.forRoot(),
];

const COMPONENTS: any = [];
const DIRECTIVES: any = [];
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
    ...MODULES,
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
  ],
  providers: []
})
export class SharedModule { }
