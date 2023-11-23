import { Component, Input } from '@angular/core';

import { EBaseColor, EFriendshipStatus, EOverlayPosition, IDropdownItem, IProfile } from '@core/models';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  @Input() profile: IProfile;
  @Input() friendshipStatus: EFriendshipStatus | null = null;
  @Input() large = false;

  readonly EBaseColor = EBaseColor;
  readonly EFriendshipStatus = EFriendshipStatus;
  readonly EOverlayPosition = EOverlayPosition;
  readonly requestAcceptedStatusDropdownItems: Array<IDropdownItem> = [{
    value: 'Удалить',
    action: this.removeAcceptedFriendship.bind(this),
  }];

  private removeAcceptedFriendship(): void {
    return;
  }
}
