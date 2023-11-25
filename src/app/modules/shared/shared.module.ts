import { LY_THEME, LY_THEME_NAME, LyTheme2 } from '@alyle/ui';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from "@angular/router";
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AuthorizedUserComponent } from './components/authorized-user';
import { AvatarComponent } from './components/avatar';
import { ButtonComponent } from './components/button';
import { CookieBannerComponent } from './components/cookie-banner';
import { DialogComponent } from './components/dialog';
import { EllipsisDropdownComponent } from './components/ellipsis-dropdown';
import { ErrorComponent } from './components/error';
import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';
import { IconComponent } from './components/icon';
import { ImageUploaderComponent } from './components/image-uploader';
import { InputComponent } from './components/input';
import { LogoComponent } from './components/logo';
import { NotFoundComponent } from './components/not-found';
import { OverlayComponent } from './components/overlay';
import { ProfileCardComponent } from './components/profile-card';
import { ProfileSettingsComponent } from './components/profile-settings';
import { SnackbarComponent } from './components/snackbar';
import { TextareaComponent } from './components/textarea';
import {
  DisableRepeatWhitespacesDirective,
  DragAndDropStyleDirective,
  LinkDirective,
  TrimStartWhitespacesDirective,
} from './directives';

const MODULES = [
  AngularSvgIconModule.forRoot(),
  CommonModule,
  FormsModule,
  HttpClientModule,
  LyImageCropperModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  OverlayModule,
  ReactiveFormsModule,
  RouterModule,
];

const COMPONENTS = [
  AuthorizedUserComponent,
  AvatarComponent,
  ButtonComponent,
  CookieBannerComponent,
  DialogComponent,
  EllipsisDropdownComponent,
  ErrorComponent,
  FooterComponent,
  HeaderComponent,
  IconComponent,
  ImageUploaderComponent,
  InputComponent,
  LogoComponent,
  NotFoundComponent,
  OverlayComponent,
  ProfileCardComponent,
  ProfileSettingsComponent,
  SnackbarComponent,
  TextareaComponent,
];

const DIRECTIVES = [
  DisableRepeatWhitespacesDirective,
  DragAndDropStyleDirective,
  LinkDirective,
  TrimStartWhitespacesDirective,
];
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
  providers: [
    [ LyTheme2 ],
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
  ]
})
export class SharedModule { }
