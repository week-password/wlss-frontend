import { Directive } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EInputType } from 'src/app/core/models';
import { BaseComponent } from './BaseComponent';

@Directive()
export class BaseFormComponent extends BaseComponent {
  form: FormGroup;
  EInputType = EInputType;

  get controls(): { [key: string]: FormControl } {
    return this.form.controls as { [key: string]: FormControl };
  }

  get submitDisabled(): boolean {
    return Object.keys(this.controls).some(
      (key: string) => this.controls[key].invalid && this.controls[key].touched
    );
  }
}
