import {
  Directive,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { EInputType } from '@core/models';

@Directive()
export class BaseInputComponent {
  @Input() disabled = false;
  @Input() inputControl = new FormControl();
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type = EInputType.text;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() input = new EventEmitter<InputEvent>();

  focused = false;

  get showError(): boolean {
    return !this.focused &&
      this.inputControl.touched &&
      this.inputControl.invalid;
  }

  onBlur(): void {
    this.focused = false;
    this.blur.emit();
  }

  onFocus(): void {
    this.focused = true;
    this.focus.emit();
  }

  onInput(event: Event): void {
    this.input.emit(event as InputEvent);
  }
}
