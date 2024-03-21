import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  @Output() submit = new EventEmitter<TWish>();
  @Output() remove = new EventEmitter<TWish>();

  @ViewChild('dialogContent') dialogContent: TemplateRef<HTMLElement>;
  @ViewChild('dialogButtons') dialogButtons: TemplateRef<HTMLElement>;
  @ViewChild('avatarUploader') avatarUploader: ImageUploaderComponent;

  wish: TWish | null;
  removeLoading = false;
  readonly EAvatarType = EAvatarType;
  readonly EBaseColor = EBaseColor;

  private dialogRef: MatDialogRef<DialogComponent>;

  constructor(private matDialog: MatDialog) {
    super();
  }

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

  closeDialog(): void {
    this.loading = false;
    this.removeLoading = false;
    this.dialogRef.close();
  }

  removeAvatar(): void {
    this.controls.avatarId.setValue(null);
  }

  onAvatarChanged(): void {
    this.changed = true;
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

  openRemoveWishDialog(): void {
    if (!this.wish) {
      return;
    }
    const removeWishDialogData: TDialogData = {
      cancelButtonText: 'Отменить',
      content:
        `<div class="d-flex flex-column">
          <div class="mb-10">Вы действительно хотите удалить желание <b class="d-inline">${this.wish.title}</b>?</div>
          <div class="mb-10">Отменить это действие будет <b class="d-inline">невозможно</b>.</div>
          <div>Если кто-то забронировал это желание, то он потеряет к нему доступ после удаления.</div>
        </div>`,
      submitButtonColor: EBaseColor.danger,
      submitButtonText: 'Удалить',
      title: 'Удаление желания',
    };
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: removeWishDialogData,
      maxWidth: '640px',
    });
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
    ).subscribe((removeSubmitted: boolean) => {
      if (removeSubmitted) {
        this.removeWish();
      }
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.submitDisabled) {
      this.loading = false;
      return;
    }
    this.loading = true;
    if (this.avatarUploader.isLoaded) {
      this.avatarUploader.triggerUploading();
      return;
    }
    const wish = this.form.value as TWish;
    this.submit.emit({ ...this.wish, ...wish });
  }

  onAvatarUploaded(avatarId: string): void {
    this.controls.avatarId.setValue(avatarId);
    this.form.markAllAsTouched();
    if (this.submitDisabled) {
      this.loading = false;
      return;
    }
    const wish = this.form.value as TWish;
    this.submit.emit({ ...this.wish, ...wish });
  }

  onAvatarUploadError(): void {
    this.loading = false;
  }

  private removeWish(): void {
    if (!this.wish) {
      return;
    }
    this.removeLoading = true;
    this.remove.emit(this.wish);
  }

  private initWishForm(): void {
    this.form = this.fb.group<TWishFormGroup>({
      avatarId: this.fb.control<string | null>(null),
      description: this.fb.control<string>('', { nonNullable: true, validators: descriptionValidators }),
      title: this.fb.control<string>('', { nonNullable: true, validators: titleValidators }),
    });
  }

  private fillWishForm(): void {
    this.controls.avatarId.setValue(this.wish?.avatarId || null);
    this.controls.description.setValue(this.wish?.description || '');
    this.controls.title.setValue(this.wish?.title || '');
    this.form.markAsUntouched();
    this.changed = false;
  }
}
