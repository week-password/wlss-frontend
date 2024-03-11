import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { TGetAccountResponse } from '@profile/models/api';
import { TProfile, TProfileFriendshipStatus } from '@profile/models/client';
import { AccountApiService, ProfileApiService } from '@profile/services/api';
import { profiles } from '@profiles/services/mocks/profiles';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(
    private accountApiService: AccountApiService,
    private profileApiService: ProfileApiService,
  ) { }

  getProfileByAccountId(accountId: number): Observable<TProfile & TProfileFriendshipStatus> {
    return this.profileApiService.getProfile(accountId);
  }

  getProfileByLogin(login: string): Observable<TProfile & TProfileFriendshipStatus> {
    return this.accountApiService.getAccount(login).pipe(
      switchMap((account: TGetAccountResponse) => {
        const accountId = account.id;
        return this.profileApiService.getProfile(accountId);
      }),
    );
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
