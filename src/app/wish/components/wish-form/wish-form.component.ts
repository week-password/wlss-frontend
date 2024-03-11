import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { BaseFormComponent } from '@core/base-components';
import { AvatarComponent } from '@core/components/avatar';
import { ButtonComponent } from '@core/components/button';
import { DialogComponent } from '@core/components/dialog';
import { ImageUploaderComponent } from '@core/components/image-uploader';
import { InputComponent } from '@core/components/input';
import { TextareaComponent } from '@core/components/textarea';
import { DisableRepeatWhitespacesDirective, TrimStartWhitespacesDirective } from '@core/directives';
import { EAvatarType, EBaseColor, TDialogData } from '@core/models/client';
import { TWish, TWishFormGroup } from '@wish/models/client';
import { descriptionValidators, titleValidators } from '@wish/validators';

@Component({
  selector: 'app-wish-form',
  templateUrl: './wish-form.component.html',
  styleUrls: ['./wish-form.component.scss'],
  standalone: true,
  imports: [
    AvatarComponent,
    ButtonComponent,
    DisableRepeatWhitespacesDirective,
    FormsModule,
    ImageUploaderComponent,
    InputComponent,
    NgIf,
    ReactiveFormsModule,
    TextareaComponent,
    TrimStartWhitespacesDirective,
  ],
})
export class WishFormComponent extends BaseFormComponent<TWishFormGroup> implements OnInit {
  @Output() remove = new EventEmitter<TWish>();

  @ViewChild('dialogContent') dialogContent: TemplateRef<HTMLElement>;
  @ViewChild('dialogButtons') dialogButtons: TemplateRef<HTMLElement>;
  @ViewChild('imageUploader') imageUploader: ImageUploaderComponent;

  wish: TWish | null;
  readonly EAvatarType = EAvatarType;
  readonly EBaseColor = EBaseColor;

  private dialogRef: MatDialogRef<DialogComponent>;

  ngOnInit(): void {
    this.initWishForm();
    this.subscribeOnFormChanges();
  }

  openDialog(wish: TWish | null = null): MatDialogRef<DialogComponent> {
    this.wish = wish;
    this.fillWishForm();
    const wishFormDialogData: TDialogData = {
      title: this.wish ? 'Редактирование желания' : 'Добавление желания',
      contentTemplate: this.dialogContent,
      buttonsTemplate: this.dialogButtons,
      customCloseFunction: this.cancelWishForm.bind(this),
    };
    this.dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: '800px',
      data: wishFormDialogData,
    });
    return this.dialogRef;
  }

  closeDialog(wish: TWish | null = null): void {
    this.dialogRef.close(wish);
    this.dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.initWishForm();
    });
  }

  removeAvatar(): void {
    this.controls.avatarId.setValue(null);
  }

  onAvatarChanged(): void {
    this.changed = true;
  }

  saveWish(): void {
    this.form.markAllAsTouched();
    if (this.submitDisabled) {
      return;
    }
    if (this.imageUploader.cropper.isLoaded) {
      this.imageUploader.cropper.crop();
    }
    this.closeDialog(this.form.value as TWish);
  }

  cancelWishForm(): void {
    if (!this.changed) {
      this.closeDialog();
      return;
    }
    const confirmDialog = this.openConfirmClosingFormDialog();
    confirmDialog.afterClosed().pipe(
      takeUntil(this.destroy$),
    ).subscribe((confirm: boolean) => {
      if (!confirm) {
        return;
      }
      this.closeDialog();
    });
  }

  private initWishForm(): void {
    this.form = this.fb.group<TWishFormGroup>({
      avatarId: this.fb.control<string | null>(null),
      description: this.fb.control<string>('', { nonNullable: true, validators: descriptionValidators }),
      title: this.fb.control<string>('', { nonNullable: true, validators: titleValidators }),
    });
  }

  private fillWishForm(): void {
    if (!this.wish) {
      return;
    }
    this.controls.avatarId.setValue(this.wish.avatarId);
    this.controls.description.setValue(this.wish.description);
    this.controls.title.setValue(this.wish.title);
    this.changed = false;
  }
}
