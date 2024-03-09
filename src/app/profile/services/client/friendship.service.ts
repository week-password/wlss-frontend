import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TProfile } from '@profile/models/client';
import { friends, incomingRequests, outgoingRequests } from '@profile/services/mocks/friendship';

@Injectable({ providedIn: 'root' })
export class FriendshipService {
  getFriends(): Observable<Array<TProfile>> {
    return of(friends);
  }

  getIncomingRequests(): Observable<Array<TProfile>> {
    return of(incomingRequests);
  }

  getOutgoingRequests(): Observable<Array<TProfile>> {
    return of(outgoingRequests);
  }
}
