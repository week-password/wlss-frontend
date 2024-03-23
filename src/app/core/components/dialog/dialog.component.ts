import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Inject, inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { ButtonComponent } from '@core/components/button';
import { IconComponent } from '@core/components/icon';
import { EBaseColor, TDialogData } from '@core/models/client';

const imports = [ButtonComponent, IconComponent, MatDialogModule, NgIf, NgTemplateOutlet];
@Component({
  imports,
  selector: 'app-dialog',
  standalone: true,
  styleUrl: 'dialog.component.scss',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent extends BaseComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  readonly buttonsTemplate?: TemplateRef<HTMLElement>;
  readonly cancelButtonText?: string;
  readonly content?: string;
  readonly contentTemplate?: TemplateRef<HTMLElement>;
  readonly submitButtonColor?: EBaseColor;
  readonly submitButtonText?: string;
  readonly title?: string;
  readonly titleTemplate?: TemplateRef<HTMLElement>;
  readonly EBaseColor = EBaseColor;
  private readonly customCloseFunction?: () => void;

  constructor(@Inject(MAT_DIALOG_DATA) data: TDialogData) {
    super();
    this.dialogRef.disableClose = true;
    this.buttonsTemplate = data.buttonsTemplate;
    this.cancelButtonText = data.cancelButtonText;
    this.content = data.content;
    this.contentTemplate = data.contentTemplate;
    this.submitButtonColor = data.submitButtonColor;
    this.submitButtonText = data.submitButtonText;
    this.title = data.title;
    this.titleTemplate = data.titleTemplate;
    this.customCloseFunction = data.customCloseFunction;
    this.subscribeOnBackdropClick();
    this.subscribeOnEscapeClick();
  }

  close(): void {
    if (this.customCloseFunction) {
      this.customCloseFunction();
      return;
    }
    this.dialogRef.close();
  }

  private subscribeOnBackdropClick(): void {
    this.dialogRef.backdropClick().pipe(takeUntil(this.destroy$)).subscribe(() => this.close());
  }

  private subscribeOnEscapeClick(): void {
    this.dialogRef.keydownEvents().pipe(takeUntil(this.destroy$)).subscribe((event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }
      this.close();
    });
  }
}
