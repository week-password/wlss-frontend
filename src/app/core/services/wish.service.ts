import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IWish } from '@core/models';

import { wishes } from './mocks/wishes';

@Injectable({ providedIn: 'root' })
export class WishService {
  getWishes(): Observable<Array<IWish>> {
    return of(wishes);
  }

  addWish(wish: IWish): Observable<IWish> {
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
      return of();
    }
    wishes.splice(wishIndex, 1);
    return of();
  }
}
