import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonComponent } from '@core/components/button';
import { EllipsisDropdownComponent } from '@core/components/ellipsis-dropdown';
import { EBaseColor, EOverlayPosition, TDropdownItem } from '@core/models/client';
import { EFriendshipStatus } from '@profile/models/client';

const imports = [ButtonComponent, EllipsisDropdownComponent, NgIf];
@Component({
  imports,
  selector: 'app-profile-actions',
  standalone: true,
  styleUrl: 'profile-actions.component.scss',
  templateUrl: 'profile-actions.component.html',
})
export class ProfileActionsComponent {
  @Input() friendshipStatus: EFriendshipStatus | null = null;

  @Output() acceptIncomingRequest = new EventEmitter<void>();
  @Output() rejectIncomingRequest = new EventEmitter<void>();
  @Output() createOutgoingRequest = new EventEmitter<void>();
  @Output() cancelOutgoingRequest = new EventEmitter<void>();
  @Output() removeAcceptedRequest = new EventEmitter<void>();

  readonly EBaseColor = EBaseColor;
  readonly EFriendshipStatus = EFriendshipStatus;
  readonly EOverlayPosition = EOverlayPosition;
  readonly acceptedRequestStatusDropdownItems: Array<TDropdownItem> = [{
    value: 'Удалить',
    action: (): void => this.removeAcceptedRequest.emit(),
  }];
}
