import { FormControl } from '@angular/forms';

import { EBookingStatus } from './BookingStatus';

export interface IWish {
  id: number;
  avatar: string | null;
  description: string;
  title: string;
}

export interface IWishBookingStatus {
  bookingStatus: EBookingStatus | null;
}

export interface IWishFormGroup {
  avatar: FormControl<string | null>;
  description: FormControl<string>;
  title: FormControl<string>;
}
