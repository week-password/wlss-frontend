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

import { AuthorizedUserComponent } from './components/authorized-user/authorized-user.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ButtonComponent } from './components/button/button.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { EllipsisDropdownComponent } from './components/ellipsis-dropdown/ellipsis-dropdown.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { InputComponent } from './components/input/input.component';
import { LogoComponent } from './components/logo/logo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TextareaComponent } from './components/textarea/textarea.component';
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
