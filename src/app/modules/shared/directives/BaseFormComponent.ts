import { Directive } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { EInputType } from 'src/app/core/models';

import { BaseComponent } from './BaseComponent';

@Directive()
export class BaseFormComponent extends BaseComponent {
  form: FormGroup;
  changed = false;
  EInputType = EInputType;

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
}
