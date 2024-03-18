import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TProfile } from '@profile/models/client';
import { FriendshipApiService } from '@profile/services/api';
import { friends, incomingRequests } from '@profile/services/mocks/friendship';

@Injectable({ providedIn: 'root' })
export class FriendshipService {
  constructor(private friendshipApiService: FriendshipApiService) { }

  getFriends(): Observable<Array<TProfile>> {
    return of(friends);
  }

  getIncomingRequests(): Observable<Array<TProfile>> {
    return of(incomingRequests);
  }

  getOutgoingRequests(accountId: number): Observable<Array<TProfile>> {
    return this.friendshipApiService.getOutgoingRequests(accountId);
  }

  createOutgoingRequest(accountId: number, friendId: number): Observable<void> {
    return this.friendshipApiService.createOutgoingRequest(accountId, friendId);
  }

  cancelOutgoingRequest(accountId: number, friendId: number): Observable<void> {
    return this.friendshipApiService.cancelOutgoingRequest(accountId, friendId);
  }
}
