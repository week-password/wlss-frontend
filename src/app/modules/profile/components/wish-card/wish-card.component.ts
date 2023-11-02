import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EAvatarType, EOverlayPosition, IDropdownItem } from 'src/app/core/models';
import { IWish } from 'src/app/modules/profile/core/models';

@Component({
  selector: 'app-wish-card',
  templateUrl: './wish-card.component.html',
  styleUrls: ['./wish-card.component.scss']
})
export class WishCardComponent {
  @Input() wish: IWish;
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  EAvatarType = EAvatarType;
  EOverlayPosition = EOverlayPosition;
  readonly dropdownItems: IDropdownItem[] = [
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
