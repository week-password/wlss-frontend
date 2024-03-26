import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appRestrictWhitespaces]',
  standalone: true,
})
export class RestrictWhitespacesDirective {
  @Input() inputControl: FormControl;

  constructor(private readonly control: ElementRef<HTMLElement>) { }

  @HostListener('input')
  onInput(): void {
    const control = this.control.nativeElement.querySelector('.mat-mdc-input-element') as HTMLInputElement | HTMLTextAreaElement;
    const value = control.value;
    const caretPosition = control.selectionStart !== null ? control.selectionStart : control.value.length;

    const restrictedValue = value
      .replaceAll(/\n{3,}/g, '\n\n')
      .trimStart()
      .split('\n')
      .map((line: string) => line.replaceAll(/\s+/g, ' ').trimStart())
      .join('\n');
    const updatedCaretPosition = caretPosition + (restrictedValue.length - value.length);

    control.value = restrictedValue;
    control.selectionStart = updatedCaretPosition;
    control.selectionEnd = updatedCaretPosition;
    this.inputControl.setValue(restrictedValue);
  }
}
