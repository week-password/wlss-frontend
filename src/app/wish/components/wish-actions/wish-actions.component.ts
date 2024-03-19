import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonComponent } from '@core/components/button';
import { EBaseColor } from '@core/models/client';
import { EBookingStatus } from '@wish/models/client';

@Component({
  selector: 'app-wish-actions',
  templateUrl: './wish-actions.component.html',
  styleUrls: ['./wish-actions.component.scss'],
  standalone: true,
  imports: [ButtonComponent, NgIf],
})
export class WishActionsComponent {
  @Input() bookingStatus: EBookingStatus | null = null;

  @Output() createBooking = new EventEmitter<void>();
  @Output() removeBooking = new EventEmitter<void>();

  readonly EBaseColor = EBaseColor;
  readonly EBookingStatus = EBookingStatus;
}
