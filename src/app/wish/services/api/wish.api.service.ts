import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TCreateWishRequest, TCreateWishResponse, TGetWishesResponse, TUpdateWishRequest, TUpdateWishResponse } from '@wish/models/api';

@Injectable({ providedIn: 'root' })
export class WishApiService {
  constructor(private http: HttpClient) { }

  getWishes(accountId: number): Observable<TGetWishesResponse> {
    return this.http.get<TGetWishesResponse>(`/accounts/${accountId}/wishes`);
  }

  createWish(accountId: number, wish: TCreateWishRequest): Observable<TCreateWishResponse> {
    return this.http.post<TCreateWishResponse>(`/accounts/${accountId}/wishes`, wish);
  }

  updateWish(accountId: number, wishId: number, wish: TUpdateWishRequest): Observable<TUpdateWishResponse> {
    return this.http.put<TUpdateWishResponse>(`/accounts/${accountId}/wishes/${wishId}`, wish);
  }

  removeWish(accountId: number, wishId: number): Observable<void> {
    return this.http.delete<void>(`/accounts/${accountId}/wishes/${wishId}`);
  }
}
