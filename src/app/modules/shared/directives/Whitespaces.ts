import { Directive, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appTrimStartWhitespaces]'
})
export class TrimStartWhitespacesDirective {
  @Input() inputControl: FormControl;

  @HostListener('input')
  onInput(): void {
    let value = this.inputControl.value as string;
    value = value.trimStart();
    this.inputControl.setValue(value);
    this.inputControl.updateValueAndValidity();
  }
}

@Directive({
  selector: '[appDisableRepeatWhitespaces]'
})
export class DisableRepeatWhitespacesDirective {
  @Input() inputControl: FormControl;

  @HostListener('input')
  onInput(): void {
    let value = this.inputControl.value as string;
    value = value.replaceAll(/\s+/g, ' ');
    this.inputControl.setValue(value);
    this.inputControl.updateValueAndValidity();
  }
}
