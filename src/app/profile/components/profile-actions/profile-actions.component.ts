import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonComponent } from '@core/components/button';
import { EllipsisDropdownComponent } from '@core/components/ellipsis-dropdown';
import { EBaseColor, EOverlayPosition, IDropdownItem } from '@core/models';
import { EFriendshipStatus } from '@profile/models';

@Component({
  selector: 'app-profile-actions',
  templateUrl: './profile-actions.component.html',
  styleUrls: ['./profile-actions.component.scss'],
  standalone: true,
  imports: [ButtonComponent, EllipsisDropdownComponent, NgIf],
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
