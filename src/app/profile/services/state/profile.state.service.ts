import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TProfile } from '@profile/models/client';

@Injectable({ providedIn: 'root' })
export class ProfileStateService {
  private profile$ = new BehaviorSubject<TProfile | null>(null);

  get profile(): Observable<TProfile | null> {
    return this.profile$.asObservable();
  }

  setProfile(profile: TProfile | null): void {
    this.profile$.next(profile);
  }
}
