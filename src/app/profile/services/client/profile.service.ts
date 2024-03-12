import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { TGetAccountResponse, TUpdateProfileRequest, TUpdateProfileResponse } from '@profile/models/api';
import { TProfile, TProfileFriendshipStatus } from '@profile/models/client';
import { AccountApiService, ProfileApiService } from '@profile/services/api';

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

  updateProfile(profile: TProfile): Observable<TProfile> {
    const accountId = profile.account.id;
    const request: TUpdateProfileRequest = {
      avatarId: profile.avatarId,
      description: profile.description,
      name: profile.name,
    };
    return this.profileApiService.updateProfile(accountId, request).pipe(
      switchMap((response: TUpdateProfileResponse) => {
        return of({ account: profile.account, ...response });
      }),
    );
  }
}
