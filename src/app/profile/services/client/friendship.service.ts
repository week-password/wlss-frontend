import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TProfile } from '@profile/models/client';
import { FriendshipApiService } from '@profile/services/api';

@Injectable({ providedIn: 'root' })
export class FriendshipService {
  constructor(private readonly friendshipApiService: FriendshipApiService) { }

  getAcceptedRequests(accountId: number): Observable<Array<TProfile>> {
    return this.friendshipApiService.getAcceptedRequests(accountId);
  }

  removeAcceptedRequest(accountId: number, friendId: number): Observable<Array<TProfile>> {
    return this.friendshipApiService.removeAcceptedRequest(accountId, friendId);
  }

  getIncomingRequests(accountId: number): Observable<Array<TProfile>> {
    return this.friendshipApiService.getIncomingRequests(accountId);
  }

  acceptIncomingRequest(accountId: number, friendId: number): Observable<void> {
    return this.friendshipApiService.acceptIncomingRequest(accountId, friendId);
  }

  rejectIncomingRequest(accountId: number, friendId: number): Observable<void> {
    return this.friendshipApiService.rejectIncomingRequest(accountId, friendId);
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
