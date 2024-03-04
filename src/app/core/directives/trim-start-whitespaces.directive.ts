import { Directive, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appTrimStartWhitespaces]',
  standalone: true,
})
export class TrimStartWhitespacesDirective {
  @Input() inputControl: FormControl;

  @HostListener('input')
  onInput(): void {
    const value = this.inputControl.value as string;
    this.inputControl.setValue(value.trimStart());
    this.inputControl.updateValueAndValidity();
  }
}
