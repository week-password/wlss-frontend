import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { TGetAccountResponse, TUpdateProfileRequest, TUpdateProfileResponse } from '@profile/models/api';
import { TProfile } from '@profile/models/client';
import { AccountApiService, ProfileApiService } from '@profile/services/api';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(
    private readonly accountApiService: AccountApiService,
    private readonly profileApiService: ProfileApiService,
  ) { }

  getProfileByAccountId(accountId: number): Observable<TProfile> {
    return this.profileApiService.getProfile(accountId);
  }

  getProfileByLogin(login: string): Observable<TProfile> {
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
      description: profile.description?.trimEnd() || null,
      name: profile.name.trimEnd(),
    };
    return this.profileApiService.updateProfile(accountId, request).pipe(
      switchMap((response: TUpdateProfileResponse) => {
        return of({ account: profile.account, friendshipStatus: null, ...response });
      }),
    );
  }
}
