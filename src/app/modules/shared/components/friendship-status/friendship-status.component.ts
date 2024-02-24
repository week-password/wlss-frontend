import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EBaseColor, EFriendshipStatus, EOverlayPosition, IDropdownItem } from '@core/models';

@Component({
  selector: 'app-friendship-status',
  templateUrl: './friendship-status.component.html',
  styleUrls: ['./friendship-status.component.scss']
})
export class FriendshipStatusComponent {
  @Input() friendshipStatus: EFriendshipStatus | null = null;

  @Output() removeAcceptedFriendship = new EventEmitter<void>();

  readonly EBaseColor = EBaseColor;
  readonly EFriendshipStatus = EFriendshipStatus;
  readonly EOverlayPosition = EOverlayPosition;
  readonly requestAcceptedStatusDropdownItems: Array<IDropdownItem> = [{
    value: 'Удалить',
    action: (): void => this.removeAcceptedFriendship.emit(),
  }];
}
