import { Directive, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appConvertEmptyStringToNull]',
  standalone: true,
})
export class ConvertEmptyStringToNullDirective {
  @Input() inputControl: FormControl;

  @HostListener('input')
  onInput(): void {
    if (this.inputControl.value === '') {
      this.inputControl.setValue(null);
    }
  }
}
