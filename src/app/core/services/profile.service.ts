import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IProfile } from 'src/app/core/models';

import { profiles } from './mocks/profiles';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  getProfile(login: string): Observable<IProfile | null> {
    const profile = profiles.find((profile: IProfile) => profile.account.login === login);
    if (!profile) {
      return of(null);
    }
    return of(profile);
  }

  setProfile(login: string, profile: IProfile): Observable<IProfile | null> {
    const profileIndex = profiles.findIndex((profile: IProfile) => profile.account.login === login);
    if (profileIndex === -1) {
      return of(null);
    }
    profiles[profileIndex] = profile;
    return of(profile);
  }
}
