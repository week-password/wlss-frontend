import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { EAvatarType, EBaseColor, IDialogData } from 'src/app/core/models';
import { descriptionValidators, titleValidators } from 'src/app/core/validators/wish';
import { IWish, IWishFormGroup } from 'src/app/modules/profile/core/models';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { ImageUploaderComponent } from 'src/app/modules/shared/components/image-uploader/image-uploader.component';
import { BaseFormComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-wish-form',
  templateUrl: './wish-form.component.html',
  styleUrls: ['./wish-form.component.scss']
})
export class WishFormComponent extends BaseFormComponent<IWishFormGroup> implements OnInit {
  @ViewChild('dialogContent') dialogContent: TemplateRef<HTMLElement>;
  @ViewChild('dialogButtons') dialogButtons: TemplateRef<HTMLElement>;
  @ViewChild('imageUploader') imageUploader: ImageUploaderComponent;

  readonly EAvatarType = EAvatarType;
  readonly EBaseColor = EBaseColor;

  private dialogRef: MatDialogRef<DialogComponent>;
  private wish: IWish | null;

  ngOnInit(): void {
    this.initWishForm();
    this.subscribeOnFormChanges();
  }

  openDialog(wish: IWish | null = null): void {
    this.wish = wish;
    this.fillWishForm();
    const wishFormDialogData: IDialogData = {
      title: this.wish ? 'Редактирование желания' : 'Добавление желания',
      contentTemplate: this.dialogContent,
      buttonsTemplate: this.dialogButtons,
      customCloseFunction: this.cancelWishForm.bind(this)
    };
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      data: wishFormDialogData,
    });
  }

  initWishForm(): void {
    this.form = this.fb.group<IWishFormGroup>({
      avatar: this.fb.control<string | null>(null),
      description: this.fb.control<string>('', { nonNullable: true, validators: descriptionValidators }),
      title: this.fb.control<string>('', { nonNullable: true, validators: titleValidators }),
    });
  }

  removeAvatar(): void {
    this.controls.avatar.setValue(null);
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
      const data = this.imageUploader.croppedImage || null;
      this.controls.avatar.setValue(data);
    }
    this.closeDialog();
  }

  cancelWishForm(): void {
    if (!this.changed) {
      this.closeDialog();
      return;
    }
    const confirmDialog = this.openConfirmClosingFormDialog();
    confirmDialog.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((confirm: boolean) => {
      if (!confirm) {
        return;
      }
      this.closeDialog();
    });
  }

  private fillWishForm(): void {
    if (!this.wish) {
      return;
    }
    this.controls.avatar.setValue(this.wish.avatar);
    this.controls.description.setValue(this.wish.description);
    this.controls.title.setValue(this.wish.title);
    this.changed = false;
  }

  private closeDialog(): void {
    this.dialogRef.close();
    this.initWishForm();
  }
}
