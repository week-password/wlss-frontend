import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BookingApiService } from '@wish/services/api';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private readonly bookingApiService: BookingApiService) { }

  createBooking(accountId: number, wishId: number): Observable<void> {
    return this.bookingApiService.createBooking(accountId, wishId);
  }

  removeBooking(accountId: number, wishId: number, bookingId: number): Observable<void> {
    return this.bookingApiService.removeBooking(accountId, wishId, bookingId);
  }
}
