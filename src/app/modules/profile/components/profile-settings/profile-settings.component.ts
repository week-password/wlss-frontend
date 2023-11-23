import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { EBaseColor, IAccount, IDialogData, IProfile, IProfileFormGroup } from '@core/models';
import { ProfileService } from '@core/services';
import { UserStateService } from '@core/state';
import { descriptionValidators, nameValidators } from '@core/validators/profile';
import { BaseFormComponent } from '@shared/base-components';
import { DialogComponent } from '@shared/components/dialog';
import { ImageUploaderComponent } from '@shared/components/image-uploader';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent extends BaseFormComponent<IProfileFormGroup> implements OnInit {
  @ViewChild('dialogContent') dialogContent: TemplateRef<HTMLElement>;
  @ViewChild('dialogButtons') dialogButtons: TemplateRef<HTMLElement>;
  @ViewChild('imageUploader') imageUploader: ImageUploaderComponent;

  dialogRef: MatDialogRef<DialogComponent>;
  login: string | null = null;
  profile: IProfile | null = null;

  EBaseColor = EBaseColor;

  constructor(
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
      const data = this.imageUploader.croppedImage || null;
      this.controls.avatar.setValue(data);
    }
    this.profileService.setProfile(this.login, this.form.value as IProfile).pipe(
      takeUntil(this.destroy$)
    ).subscribe((profile: IProfile | null) => {
      this.userStateService.setProfile(profile);
      this.closeDialog();
    });
  }

  cancelProfileSettings(): void {
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

  private initProfileSettingsForm(): void {
    this.form = this.fb.group<IProfileFormGroup>({
      avatar: this.fb.control<string | null>(null),
      description: this.fb.control<string | null>('', descriptionValidators),
      name: this.fb.control<string>('', { nonNullable: true, validators: nameValidators }),
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
