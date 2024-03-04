import { NgIf } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { EBaseColor, IDialogData } from '@core/models';
import { IProfile, IProfileFormGroup } from '@profile/models';
import { ProfileService } from '@profile/services';
import { descriptionValidators, nameValidators } from '@profile/validators';
import { UserStateService } from '@root/state';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
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
export class ProfileSettingsComponent extends BaseFormComponent<IProfileFormGroup> implements OnInit {
  @ViewChild('dialogContent') dialogContent: TemplateRef<HTMLElement>;
  @ViewChild('dialogButtons') dialogButtons: TemplateRef<HTMLElement>;
  @ViewChild('imageUploader') imageUploader: ImageUploaderComponent;

  profile: IProfile | null = null;
  EBaseColor = EBaseColor;

  private dialogRef: MatDialogRef<DialogComponent>;

  constructor(
    private userStateService: UserStateService,
    private profileService: ProfileService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initProfileSettingsForm();
    this.subscribeOnProfileChanges();
    this.subscribeOnFormChanges();
  }

  openDialog(): void {
    const profileSettingsDialogData: IDialogData = {
      title: 'Редактирование профиля',
      contentTemplate: this.dialogContent,
      buttonsTemplate: this.dialogButtons,
      customCloseFunction: this.cancelProfileSettings.bind(this),
    };
    this.dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: '800px',
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
    if (!this.profile) {
      return;
    }
    if (this.imageUploader.cropper.isLoaded) {
      this.imageUploader.cropper.crop();
      const data = this.imageUploader.croppedImage || null;
      this.controls.avatar.setValue(data);
    }
    const profile: IProfile = {
      ...this.profile,
      ...this.form.value,
    };
    this.profileService.setProfile(profile).pipe(
      takeUntil(this.destroy$),
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
      takeUntil(this.destroy$),
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

  private subscribeOnProfileChanges(): void {
    this.userStateService.profile.pipe(
      takeUntil(this.destroy$),
    ).subscribe((profile: IProfile | null) => {
      this.profile = profile;
      this.fillProfileSettingsForm();
    });
  }
}
