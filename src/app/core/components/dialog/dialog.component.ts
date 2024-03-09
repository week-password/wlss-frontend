import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { ButtonComponent } from '@core/components/button';
import { IconComponent } from '@core/components/icon';
import { EBaseColor, TDialogData } from '@core/models/client';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [ButtonComponent, IconComponent, MatDialogModule, NgIf, NgTemplateOutlet],
})
export class DialogComponent extends BaseComponent {
  EBaseColor = EBaseColor;

  buttonsTemplate?: TemplateRef<HTMLElement>;
  cancelButtonText?: string;
  content?: string;
  contentTemplate?: TemplateRef<HTMLElement>;
  customCloseFunction?: () => void;
  submitButtonColor?: EBaseColor;
  submitButtonText?: string;
  title?: string;
  titleTemplate?: TemplateRef<HTMLElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: TDialogData,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) {
    super();
    this.dialogRef.disableClose = true;
    this.buttonsTemplate = data.buttonsTemplate;
    this.cancelButtonText = data.cancelButtonText;
    this.content = data.content;
    this.contentTemplate = data.contentTemplate;
    this.customCloseFunction = data.customCloseFunction;
    this.submitButtonColor = data.submitButtonColor;
    this.submitButtonText = data.submitButtonText;
    this.title = data.title;
    this.titleTemplate = data.titleTemplate;
    this.subscribeOnBackdropClick();
    this.subscribeOnEscapeClick();
  }

  subscribeOnBackdropClick(): void {
    this.dialogRef.backdropClick().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.close();
    });
  }

  subscribeOnEscapeClick(): void {
    this.dialogRef.keydownEvents().pipe(takeUntil(this.destroy$)).subscribe((event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }
      this.close();
    });
  }

  close(): void {
    if (this.customCloseFunction) {
      this.customCloseFunction();
      return;
    }
    this.dialogRef.close();
  }
}
