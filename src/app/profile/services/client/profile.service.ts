import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TProfile } from '@profile/models/client';
import { profiles } from '@profiles/services/mocks/profiles';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  getProfile(login: string): Observable<TProfile | null> {
    const profile = profiles.find((profile: TProfile) => profile.account.login === login);
    if (!profile) {
      return of(null);
    }
    return of(profile);
  }

  setProfile(profile: TProfile): Observable<TProfile | null> {
    const login = profile.account.login;
    const profileIndex = profiles.findIndex((profile: TProfile) => profile.account.login === login);
    if (profileIndex === -1) {
      return of(null);
    }
    profiles[profileIndex] = profile;
    return of(profile);
  }
}
