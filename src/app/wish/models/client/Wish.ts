import { FormControl } from '@angular/forms';

import { EBookingStatus } from './BookingStatus';

export type TWish = {
  id: number;
  avatarId: string | null;
  description: string;
  title: string;
  bookingId: number | null;
  bookingStatus: EBookingStatus | null;
}

export type TWishFormGroup = {
  [key in keyof Omit<TWish, 'id' | 'bookingStatus' | 'bookingId'>]: FormControl<TWish[key]>;
}
