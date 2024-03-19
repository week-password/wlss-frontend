import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { TCreateWishRequest, TCreateWishResponse, TUpdateWishRequest, TUpdateWishResponse } from '@wish/models/api';
import { TWish } from '@wish/models/client';
import { WishApiService } from '@wish/services/api';

@Injectable({ providedIn: 'root' })
export class WishService {
  constructor(private wishApiService: WishApiService) { }

  getWishes(accountId: number): Observable<Array<TWish>> {
    return this.wishApiService.getWishes(accountId);
  }

  createWish(accountId: number, wish: Omit<TWish, 'id'>): Observable<TWish> {
    const request: TCreateWishRequest = {
      avatarId: wish.avatarId,
      description: wish.description,
      title: wish.title,
    };
    return this.wishApiService.createWish(accountId, request).pipe(
      switchMap((response: TCreateWishResponse) => of({
        bookingStatus: null,
        ...response,
      })),
    );
  }

  updateWish(accountId: number, wish: TWish): Observable<TWish> {
    const request: TUpdateWishRequest = {
      avatarId: wish.avatarId,
      description: wish.description,
      title: wish.title,
    };
    return this.wishApiService.updateWish(accountId, wish.id, request).pipe(
      switchMap((response: TUpdateWishResponse) => of({
        bookingStatus: wish.bookingStatus,
        ...response,
      })),
    );
  }

  removeWish(accountId: number, wishId: number): Observable<void> {
    return this.wishApiService.removeWish(accountId, wishId);
  }
}
