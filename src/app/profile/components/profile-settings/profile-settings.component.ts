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
import { EBaseColor, TDialogData } from '@core/models/client';
import { TProfile, TProfileFormGroup } from '@profile/models/client';
import { descriptionValidators, nameValidators } from '@profile/validators';
import { UserStateService } from '@root/services/state';

const imports = [
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
];
@Component({
  imports,
  selector: 'app-profile-settings',
  standalone: true,
  styleUrl: 'profile-settings.component.scss',
  templateUrl: 'profile-settings.component.html',
})
export class ProfileSettingsComponent extends BaseFormComponent<TProfileFormGroup> implements OnInit {
  @Output() submit = new EventEmitter<TProfile>();

  @ViewChild('dialogContent') dialogContent: TemplateRef<HTMLElement>;
  @ViewChild('dialogButtons') dialogButtons: TemplateRef<HTMLElement>;
  @ViewChild('avatarUploader') avatarUploader: ImageUploaderComponent;

  profile: TProfile | null = null;
  readonly EBaseColor = EBaseColor;

  private dialogRef: MatDialogRef<DialogComponent>;

  constructor(private readonly userStateService: UserStateService) {
    super();
  }

  ngOnInit(): void {
    this.initProfileSettingsForm();
    this.subscribeOnProfileChanges();
    this.subscribeOnFormChanges();
  }

  openDialog(): void {
    const profileSettingsDialogData: TDialogData = {
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

  closeDialog(): void {
    this.loading = false;
    this.dialogRef.close();
  }

  removeAvatar(): void {
    this.controls.avatarId.setValue(null);
  }

  onAvatarChanged(): void {
    this.changed = true;
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
      this.dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.fillProfileSettingsForm();
      });
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
    const profile = this.form.value as TProfile;
    this.submit.emit({ ...this.profile, ...profile });
  }

  onAvatarUploaded(avatarId: string): void {
    this.controls.avatarId.setValue(avatarId);
    this.form.markAllAsTouched();
    if (this.submitDisabled) {
      this.loading = false;
      return;
    }
    const profile = this.form.value as TProfile;
    this.submit.emit({ ...this.profile, ...profile });
  }

  onAvatarUploadError(): void {
    this.loading = false;
  }

  private initProfileSettingsForm(): void {
    this.form = this.fb.group<TProfileFormGroup>({
      avatarId: this.fb.control<string | null>(null),
      description: this.fb.control<string | null>('', descriptionValidators),
      name: this.fb.control<string>('', { nonNullable: true, validators: nameValidators }),
    });
  }

  private fillProfileSettingsForm(): void {
    if (!this.profile) {
      return;
    }
    this.controls.avatarId.setValue(this.profile.avatarId);
    this.controls.description.setValue(this.profile.description);
    this.controls.name.setValue(this.profile.name);
    this.form.markAsUntouched();
    this.changed = false;
  }

  private subscribeOnProfileChanges(): void {
    this.userStateService.profile.pipe(
      takeUntil(this.destroy$),
    ).subscribe((profile: TProfile | null) => {
      this.profile = profile;
      this.fillProfileSettingsForm();
    });
  }
}
