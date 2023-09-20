import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { CustomTemplateRef, EBaseColor, IAccount, IDialogData, IProfile } from 'src/app/core/models';
import { ProfileService } from 'src/app/core/services';
import { UserStateService } from 'src/app/core/state';
import { descriptionValidators, nameValidators } from 'src/app/core/validators';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { ImageUploaderComponent } from 'src/app/modules/shared/components/image-uploader/image-uploader.component';
import { BaseFormComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent extends BaseFormComponent implements OnInit {
  @ViewChild('dialogContent') dialogContent: CustomTemplateRef;
  @ViewChild('dialogButtons') dialogButtons: CustomTemplateRef;
  @ViewChild('imageUploader') imageUploader: ImageUploaderComponent;

  dialogRef: MatDialogRef<DialogComponent>;
  login: string | null = null;
  profile: IProfile | null = null;

  EBaseColor = EBaseColor;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userStateService: UserStateService,
    private profileService: ProfileService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initProfileSettingsForm();
    this.subscribeOnAccountChanges();
    this.subscribeOnProfileChanges();
    this.subscribeOnFormChanges();
  }

  openDialog(): void {
    const profileSettingsDialogData: IDialogData = {
      title: 'Редактирование профиля',
      contentTemplate: this.dialogContent,
      buttonsTemplate: this.dialogButtons,
      customCloseFunction: this.cancelProfileSettings.bind(this)
    };
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      data: profileSettingsDialogData,
    });
  }

  removeAvatar(): void {
    this.controls.avatar.setValue(null);
  }

  onAvatarChanged(): void {
    this.changed = true;
  }

  saveProfileSettings(): void {
    this.form.markAllAsTouched();
    if (this.submitDisabled) {
      return;
    }
    if (!this.login) {
      return;
    }
    if (this.imageUploader.cropper.isLoaded) {
      this.imageUploader.cropper.crop();
      const data = this.imageUploader.croppedImage;
      this.controls.avatar.setValue(data);
    }
    this.profileService.setProfile(this.login, this.form.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe((profile: IProfile) => {
      this.userStateService.setProfile(profile);
      this.closeDialog();
    });
  }

  cancelProfileSettings(): void {
    if (!this.changed) {
      this.closeDialog();
      return;
    }
    const confirmDialog = this.openConfirmDialog();
    confirmDialog.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((confirm: boolean) => {
      if (!confirm) {
        return;
      }
      this.closeDialog();
    });
  }

  private initProfileSettingsForm(): void {
    this.form = this.fb.group({
      avatar: this.fb.control(''),
      description: this.fb.control('', descriptionValidators),
      name: this.fb.control('', nameValidators),
    });
  }

  private fillProfileSettingsForm(): void {
    if (!this.profile) {
      return;
    }
    this.controls.avatar.setValue(this.profile.avatar);
    this.controls.description.setValue(this.profile.description);
    this.controls.name.setValue(this.profile.name);
    this.changed = false;
  }

  private openConfirmDialog(): MatDialogRef<DialogComponent> {
    const confirmDialogData: IDialogData = {
      title: 'Закрыть окно?',
      content: 'Несохранённые данные будут утеряны',
      cancelButtonText: 'Отменить',
      submitButtonText: 'Закрыть',
      submitButtonColor: EBaseColor.danger,
    };
    return this.dialog.open(DialogComponent, {
      width: '460px',
      data: confirmDialogData,
    });
  }

  private closeDialog(): void {
    this.dialogRef.close();
    this.fillProfileSettingsForm();
  }

  private subscribeOnAccountChanges(): void {
    this.userStateService.account.pipe(
      takeUntil(this.destroy$)
    ).subscribe((account: IAccount | null) => {
      this.login = account?.login || null;
    });
  }

  private subscribeOnProfileChanges(): void {
    this.userStateService.profile.pipe(
      takeUntil(this.destroy$)
    ).subscribe((profile: IProfile | null) => {
      this.profile = profile;
      this.fillProfileSettingsForm();
    });
  }
}
