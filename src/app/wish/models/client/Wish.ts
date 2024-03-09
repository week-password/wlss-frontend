import { FormControl } from '@angular/forms';

import { EBookingStatus } from './BookingStatus';

export type TWish = {
  id: number;
  avatar: string | null;
  description: string;
  title: string;
}

export type TWishBookingStatus = {
  bookingStatus: EBookingStatus | null;
}

export type TWishFormGroup = {
  [key in keyof Omit<TWish, 'id'>]: FormControl<TWish[key]>;
}
