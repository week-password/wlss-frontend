import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EBookingStatus, TWish, TWishBookingStatus } from '@wish/models/client';
import { bookedByAnotherUser, bookedByCurrentUser } from '@wish/services/mocks/booking';
import { wishes } from '@wish/services/mocks/wishes';

@Injectable({ providedIn: 'root' })
export class WishService {
  getWishes(): Observable<Array<TWish & TWishBookingStatus>> {
    return of(wishes.map((wish: TWish) => {
      return {
        ...wish,
        bookingStatus: this.getBookingStatus(wish.id),
      };
    }));
  }

  addWish(wish: Omit<TWish, 'id'>): Observable<TWish> {
    const id = Math.max(...wishes.map((wish: TWish) => wish.id || 0)) + 1;
    wishes.push({ id, ...wish });
    return of({ id, ...wish });
  }

  updateWish(wish: TWish): Observable<TWish> {
    const id = wish.id;
    const wishIndex = wishes.findIndex((wish: TWish) => wish.id === id);
    if (wishIndex === -1) {
      return of(wish);
    }
    wishes[wishIndex] = wish;
    return of(wish);
  }

  removeWish(wish: TWish): Observable<void> {
    const id = wish.id;
    const wishIndex = wishes.findIndex((wish: TWish) => wish.id === id);
    if (wishIndex === -1) {
      return of(undefined);
    }
    wishes.splice(wishIndex, 1);
    return of(undefined);
  }

  private getBookingStatus(id: number): EBookingStatus {
    if (bookedByCurrentUser.find((wish: TWish) => wish.id === id)) {
      return EBookingStatus.bookedByCurrentUser;
    }
    if (bookedByAnotherUser.find((wish: TWish) => wish.id === id)) {
      return EBookingStatus.bookedByAnotherUser;
    }
    return EBookingStatus.notBooked;
  }
}
