import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TGetOutgoingRequestsResponse } from '@profile/models/api';

@Injectable({ providedIn: 'root' })
export class FriendshipApiService {
  constructor(private http: HttpClient) { }

  getOutgoingRequests(accountId: number): Observable<TGetOutgoingRequestsResponse> {
    return this.http.get<TGetOutgoingRequestsResponse>(`/accounts/${accountId}/friends/outgoing`);
  }

  createOutgoingRequest(accountId: number, friendId: number): Observable<void> {
    return this.http.post<void>(`/accounts/${accountId}/friends/outgoing/${friendId}`, {});
  }

  cancelOutgoingRequest(accountId: number, friendId: number): Observable<void> {
    return this.http.delete<void>(`/accounts/${accountId}/friends/outgoing/${friendId}`);
  }
}
