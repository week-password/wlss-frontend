import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EBaseColor, EFriendshipStatus, EOverlayPosition, IDropdownItem } from '@core/models';

@Component({
  selector: 'app-profile-actions',
  templateUrl: './profile-actions.component.html',
  styleUrls: ['./profile-actions.component.scss']
})
export class ProfileActionsComponent {
  @Input() friendshipStatus: EFriendshipStatus | null = null;

  @Output() removeAcceptedFriendship = new EventEmitter<void>();

  readonly EBaseColor = EBaseColor;
  readonly EFriendshipStatus = EFriendshipStatus;
  readonly EOverlayPosition = EOverlayPosition;
  readonly acceptedRequestStatusDropdownItems: Array<IDropdownItem> = [{
    value: 'Удалить',
    action: (): void => this.removeAcceptedFriendship.emit(),
  }];
}
