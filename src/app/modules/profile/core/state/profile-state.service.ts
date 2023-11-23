import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IProfile } from '@core/models';

@Injectable({ providedIn: 'root' })
export class ProfileStateService {
  private profile$ = new BehaviorSubject<IProfile | null>(null);

  get profile(): Observable<IProfile | null> {
    return this.profile$.asObservable();
  }

  setProfile(profile: IProfile | null): void {
    this.profile$.next(profile);
  }
}
