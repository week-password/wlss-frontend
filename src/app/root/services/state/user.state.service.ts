import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IAccount, IProfile } from '@profile/models';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private account$ = new BehaviorSubject<IAccount | null>(null);
  private profile$ = new BehaviorSubject<IProfile | null>(null);

  get account(): Observable<IAccount | null> {
    return this.account$.asObservable();
  }
  get profile(): Observable<IProfile | null> {
    return this.profile$.asObservable();
  }

  setAccount(account: IAccount | null): void {
    this.account$.next(account);
  }
  setProfile(profile: IProfile | null): void {
    this.profile$.next(profile);
  }
}
