import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IProfile } from '@profile/models';
import { friends, incomingRequests, outgoingRequests } from '@profile/services/mocks/friendship';

@Injectable({ providedIn: 'root' })
export class FriendshipService {
  getFriends(): Observable<Array<IProfile>> {
    return of(friends);
  }

  getIncomingRequests(): Observable<Array<IProfile>> {
    return of(incomingRequests);
  }

  getOutgoingRequests(): Observable<Array<IProfile>> {
    return of(outgoingRequests);
  }
}
