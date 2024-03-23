import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Inject, inject, TemplateRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ButtonComponent } from '@core/components/button';
import { EPosition, ESnackbarView, ETextPosition, TSnackbarData } from '@core/models/client';

const imports = [AngularSvgIconModule, ButtonComponent, MatSnackBarModule, NgIf, NgTemplateOutlet];
@Component({
  imports,
  selector: 'app-snackbar',
  standalone: true,
  styleUrl: 'snackbar.component.scss',
  templateUrl: 'snackbar.component.html',
})
export class SnackbarComponent {
  readonly snackBarRef = inject(MatSnackBarRef);

  readonly buttonText?: string;
  readonly catPosition?: EPosition = EPosition.top;
  readonly text?: string;
  readonly textAlign?: ETextPosition = ETextPosition.right;
  readonly textTemplate?: TemplateRef<HTMLElement>;
  readonly title?: string;
  readonly titleTemplate?: TemplateRef<HTMLElement>;
  readonly view: ESnackbarView;
  readonly width: number = 320;

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
