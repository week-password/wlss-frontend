import { Directive, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { DialogComponent } from '@core/components/dialog';
import { EBaseColor, EInputType, TDialogData } from '@core/models/client';

import { BaseComponent } from './BaseComponent';

@Directive()
export class BaseFormComponent<FormGroupModel extends { [K in keyof FormGroupModel]: AbstractControl }> extends BaseComponent {
  form: FormGroup<FormGroupModel>;
  changed = false;
  readonly EInputType = EInputType;

  protected readonly dialog: MatDialog;
  protected readonly fb: FormBuilder;

  constructor() {
    super();
    this.dialog = inject(MatDialog);
    this.fb = inject(FormBuilder);
  }

  get controls(): FormGroupModel {
    return this.form.controls as FormGroupModel;
  }

  get submitDisabled(): boolean {
    const controls = Object.values(this.controls) as Array<AbstractControl>;
    return controls.some(
      (control: AbstractControl) => control.invalid && control.touched,
    );
  }

  protected subscribeOnFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.changed = true;
    });
  }

  protected openConfirmClosingFormDialog(): MatDialogRef<DialogComponent> {
    const confirmDialogData: TDialogData = {
      title: 'Закрыть окно?',
      content: 'Несохранённые данные будут утеряны',
      cancelButtonText: 'Отменить',
      submitButtonText: 'Закрыть',
      submitButtonColor: EBaseColor.danger,
    };
    return this.dialog.open(DialogComponent, {
      width: '460px',
      maxWidth: '460px',
      data: confirmDialogData,
    });
  }
}
