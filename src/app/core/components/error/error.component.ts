import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { ErrorsPrioritizer } from '@core/classes';

const imports = [NgIf];
@Component({
  imports,
  selector: 'app-error',
  standalone: true,
  styleUrl: 'error.component.scss',
  templateUrl: 'error.component.html',
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
