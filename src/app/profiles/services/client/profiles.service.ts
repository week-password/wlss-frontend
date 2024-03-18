import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EFriendshipStatus, TProfile } from '@profile/models/client';
import { friends, incomingRequests, outgoingRequests } from '@profile/services/mocks/friendship';
import { TProfilesFilter } from '@profiles/models/client';
import { profiles } from '@profiles/services/mocks/profiles';
import { account } from '@root/services/mocks/account';

@Injectable({ providedIn: 'root' })
export class ProfilesService {
  getProfiles(filter: TProfilesFilter): Observable<Array<TProfile>> {
    const filteredProfiles: Array<TProfile> = profiles
      .filter((profile: TProfile) =>
        profile.account.login.toLowerCase().includes(filter.login) &&
        profile.name.toLowerCase().includes(filter.name),
      ).map((profile: TProfile) => {
        return {
          ...profile,
          friendshipStatus: this.getFriendshipStatus(profile.account.id),
        };
      });

    return of(filteredProfiles);
  }

  private getFriendshipStatus(id: number): EFriendshipStatus | null {
    if (account.id === id) {
      return null;
    }
    if (friends.find((profile: TProfile) => profile.account.id === id)) {
      return EFriendshipStatus.acceptedRequest;
    }
    if (incomingRequests.find((profile: TProfile) => profile.account.id === id)) {
      return EFriendshipStatus.incomingRequest;
    }
    if (outgoingRequests.find((profile: TProfile) => profile.account.id === id)) {
      return EFriendshipStatus.outgoingRequest;
    }
    return EFriendshipStatus.notRequested;
  }
}
