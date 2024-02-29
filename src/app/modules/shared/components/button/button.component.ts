import { Component, HostBinding, Input } from '@angular/core';

import { EBaseColor } from '@core/models';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() color: EBaseColor = EBaseColor.primary;
  @Input() disabled = false;
  @Input() height: number;
  @Input() label: string;

  @HostBinding('class')
  get disablePointerEventsClass(): string {
    return this.disabled ? 'disable-pointer-events' : '';
  }
}
