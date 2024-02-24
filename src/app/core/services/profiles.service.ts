import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EFriendshipStatus, IProfile, IProfileFriendshipStatus, IProfilesFilter } from '@core/models';
import { account } from '@core/services/mocks/account';
import { friends, incomingRequests, outgoingRequests } from '@core/services/mocks/friendship';
import { profiles } from '@core/services/mocks/profiles';

@Injectable({ providedIn: 'root' })
export class ProfilesService {
  getProfiles(filter: IProfilesFilter): Observable<Array<IProfile & IProfileFriendshipStatus>> {
    const filteredProfiles: Array<IProfile & IProfileFriendshipStatus> = profiles
      .filter((profile: IProfile) =>
        profile.account.login.toLowerCase().includes(filter.login) &&
        profile.name.toLowerCase().includes(filter.name)
      ).map((profile: IProfile) => {
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
    if (friends.find((profile: IProfile) => profile.account.id === id)) {
      return EFriendshipStatus.requestAccepted;
    }
    if (incomingRequests.find((profile: IProfile) => profile.account.id === id)) {
      return EFriendshipStatus.incomingRequest;
    }
    if (outgoingRequests.find((profile: IProfile) => profile.account.id === id)) {
      return EFriendshipStatus.outgoingRequest;
    }
    return EFriendshipStatus.notRequested;
  }
}
