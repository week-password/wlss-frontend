import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EBaseColor, EBookingStatus, EOverlayPosition, IDropdownItem } from '@core/models';

@Component({
  selector: 'app-wish-actions',
  templateUrl: './wish-actions.component.html',
  styleUrls: ['./wish-actions.component.scss']
})
export class WishActionsComponent {
  @Input() bookingStatus: EBookingStatus | null = null;

  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  readonly EBaseColor = EBaseColor;
  readonly EBookingStatus = EBookingStatus;
  readonly EOverlayPosition = EOverlayPosition;
  readonly dropdownItems: Array<IDropdownItem> = [
    {
      value: 'Редактировать',
      action: (): void => this.edit.emit(),
    },
    {
      value: 'Удалить',
      action: (): void => this.remove.emit(),
    },
  ];
}
