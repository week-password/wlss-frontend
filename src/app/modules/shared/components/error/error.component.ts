import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorsPrioritizer } from 'src/app/core/classes/Prioritizer';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input()
  get errors(): ValidationErrors {
    return this._errors;
  }
  set errors(value: ValidationErrors | null) {
    this._errors = value || {};
    if (!value) {
      this.error = '';
      return;
    }
    const prioritizer = new ErrorsPrioritizer(value);
    this.error = prioritizer.elements[0];
  }
  error = '';
  private _errors: ValidationErrors = {};
}
