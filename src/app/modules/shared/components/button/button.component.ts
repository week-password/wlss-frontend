import { Component, Input, HostBinding } from '@angular/core';
import { EBaseColor } from 'src/app/core/models';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() color: EBaseColor = EBaseColor.primary;
  @Input() disabled = false;
  @Input() height = 50;
  @Input() label: string;

  @HostBinding('class')
  get disablePointerEventsClass(): string {
    return this.disabled ? 'disable-pointer-events' : '';
  }
}
