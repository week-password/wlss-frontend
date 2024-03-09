import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Inject, inject, TemplateRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ButtonComponent } from '@core/components/button';
import { EPosition, ESnackbarView, ETextPosition, TSnackbarData } from '@core/models/client';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  standalone: true,
  imports: [AngularSvgIconModule, ButtonComponent, MatSnackBarModule, NgIf, NgTemplateOutlet],
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);

  buttonText?: string;
  catPosition? = EPosition.top;
  text?: string;
  textAlign? = ETextPosition.right;
  textTemplate?: TemplateRef<HTMLElement>;
  title?: string;
  titleTemplate?: TemplateRef<HTMLElement>;
  view: ESnackbarView;
  width? = 320;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: TSnackbarData) {
    this.buttonText = data.buttonText;
    this.catPosition = data.catPosition || this.catPosition;
    this.text = data.text;
    this.textAlign = data.textAlign || this.textAlign;
    this.textTemplate = data.textTemplate;
    this.title = data.title;
    this.titleTemplate = data.titleTemplate;
    this.view = data.view;
    this.width = data.width || this.width;
  }
}
