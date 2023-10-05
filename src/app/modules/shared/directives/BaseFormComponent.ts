import { Directive, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { EBaseColor, EInputType, IDialogData } from 'src/app/core/models';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';

import { BaseComponent } from './BaseComponent';

@Directive()
export class BaseFormComponent extends BaseComponent {
  form: FormGroup;
  changed = false;
  EInputType = EInputType;

  protected readonly dialog: MatDialog;
  protected readonly fb: FormBuilder;

  constructor() {
    super();
    this.dialog = inject(MatDialog);
    this.fb = inject(FormBuilder);
  }

  get controls(): { [key: string]: FormControl } {
    return this.form.controls as { [key: string]: FormControl };
  }

  get submitDisabled(): boolean {
    return Object.keys(this.controls).some(
      (key: string) => this.controls[key].invalid && this.controls[key].touched
    );
  }

  protected subscribeOnFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.changed = true;
    });
  }

  protected openConfirmClosingFormDialog(): MatDialogRef<DialogComponent> {
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
}
