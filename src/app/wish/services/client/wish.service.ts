import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EBookingStatus, IWish, IWishBookingStatus } from '@wish/models';
import { bookedByAnotherUser, bookedByCurrentUser } from '@wish/services/mocks/booking';
import { wishes } from '@wish/services/mocks/wishes';

@Injectable({ providedIn: 'root' })
export class WishService {
  getWishes(): Observable<Array<IWish & IWishBookingStatus>> {
    return of(wishes.map((wish: IWish) => {
      return {
        ...wish,
        bookingStatus: this.getBookingStatus(wish.id),
      };
    }));
  }

  addWish(wish: Omit<IWish, 'id'>): Observable<IWish> {
    const id = Math.max(...wishes.map((wish: IWish) => wish.id || 0)) + 1;
    wishes.push({ id, ...wish });
    return of({ id, ...wish });
  }

  updateWish(wish: IWish): Observable<IWish> {
    const id = wish.id;
    const wishIndex = wishes.findIndex((wish: IWish) => wish.id === id);
    if (wishIndex === -1) {
      return of(wish);
    }
    wishes[wishIndex] = wish;
    return of(wish);
  }

  removeWish(wish: IWish): Observable<void> {
    const id = wish.id;
    const wishIndex = wishes.findIndex((wish: IWish) => wish.id === id);
    if (wishIndex === -1) {
      return of(undefined);
    }
    wishes.splice(wishIndex, 1);
    return of(undefined);
  }

  private getBookingStatus(id: number): EBookingStatus {
    if (bookedByCurrentUser.find((wish: IWish) => wish.id === id)) {
      return EBookingStatus.bookedByCurrentUser;
    }
    if (bookedByAnotherUser.find((wish: IWish) => wish.id === id)) {
      return EBookingStatus.bookedByAnotherUser;
    }
    return EBookingStatus.notBooked;
  }
}
