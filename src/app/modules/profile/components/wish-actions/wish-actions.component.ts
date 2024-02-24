import { Component, EventEmitter, Output } from '@angular/core';

import { EOverlayPosition, IDropdownItem } from '@core/models';

@Component({
  selector: 'app-wish-actions',
  templateUrl: './wish-actions.component.html',
  styleUrls: ['./wish-actions.component.scss']
})
export class WishActionsComponent {
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

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
