import { Component, Inject, inject, TemplateRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { EPosition, ESnackbarView, ETextPosition, ISnackbarData } from '@core/models';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
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

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: ISnackbarData) {
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
