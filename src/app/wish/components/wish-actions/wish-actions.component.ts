import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonComponent } from '@core/components/button';
import { EBaseColor } from '@core/models/client';
import { EBookingStatus } from '@wish/models/client';

const imports = [ButtonComponent, NgIf];
@Component({
  imports,
  selector: 'app-wish-actions',
  standalone: true,
  styleUrl: 'wish-actions.component.scss',
  templateUrl: 'wish-actions.component.html',
})
export class WishActionsComponent {
  @Input() bookingStatus: EBookingStatus | null = null;

  @Output() createBooking = new EventEmitter<void>();
  @Output() removeBooking = new EventEmitter<void>();

  readonly EBaseColor = EBaseColor;
  readonly EBookingStatus = EBookingStatus;
}
