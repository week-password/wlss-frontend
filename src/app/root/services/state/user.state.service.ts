import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TAccount, TProfile } from '@profile/models/client';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private readonly account$ = new BehaviorSubject<TAccount | null>(null);
  private readonly profile$ = new BehaviorSubject<TProfile | null>(null);

  get account(): Observable<TAccount | null> {
    return this.account$.asObservable();
  }
  get profile(): Observable<TProfile | null> {
    return this.profile$.asObservable();
  }

  setAccount(account: TAccount | null): void {
    this.account$.next(account);
  }
  setProfile(profile: TProfile | null): void {
    this.profile$.next(profile);
  }
}
