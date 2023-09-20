import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IProfile } from 'src/app/core/models';

import { profiles } from './mocks/profiles';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  getProfile(login: string): Observable<IProfile> {
    return of(profiles[login]);
  }

  setProfile(login: string, profile: IProfile): Observable<IProfile> {
    profiles[login] = profile;
    return of(profiles[login]);
  }
}
