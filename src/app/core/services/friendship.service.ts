import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IProfile } from 'src/app/core/models';

import { friends, incomingRequests, outgoingRequests } from './mocks/friendship';

@Injectable({ providedIn: 'root' })
export class FriendshipService {
  getFriends(): Observable<IProfile[]> {
    return of(friends);
  }

  getIncomingRequests(): Observable<IProfile[]> {
    return of(incomingRequests);
  }

  getOutgoingRequests(): Observable<IProfile[]> {
    return of(outgoingRequests);
  }
}
