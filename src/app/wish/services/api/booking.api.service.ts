import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingApiService {
  constructor(private readonly http: HttpClient) { }

  createBooking(accountId: number, wishId: number): Observable<void> {
    return this.http.post<void>(`/accounts/${accountId}/wishes/${wishId}/bookings`, {});
  }

  removeBooking(accountId: number, wishId: number, bookingId: number): Observable<void> {
    return this.http.delete<void>(`/accounts/${accountId}/wishes/${wishId}/bookings/${bookingId}`);
  }
}
