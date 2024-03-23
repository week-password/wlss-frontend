import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TGetAcceptedRequestsResponse, TGetIncomingRequestsResponse, TGetOutgoingRequestsResponse } from '@profile/models/api';

@Injectable({ providedIn: 'root' })
export class FriendshipApiService {
  constructor(private readonly http: HttpClient) { }

  getAcceptedRequests(accountId: number): Observable<TGetAcceptedRequestsResponse> {
    return this.http.get<TGetOutgoingRequestsResponse>(`/accounts/${accountId}/friends/accepted`);
  }

  removeAcceptedRequest(accountId: number, friendId: number): Observable<TGetAcceptedRequestsResponse> {
    return this.http.delete<TGetOutgoingRequestsResponse>(`/accounts/${accountId}/friends/accepted/${friendId}`);
  }

  getIncomingRequests(accountId: number): Observable<TGetIncomingRequestsResponse> {
    return this.http.get<TGetIncomingRequestsResponse>(`/accounts/${accountId}/friends/incoming`);
  }

  acceptIncomingRequest(accountId: number, friendId: number): Observable<void> {
    return this.http.post<void>(`/accounts/${accountId}/friends/accepted/${friendId}`, {});
  }

  rejectIncomingRequest(accountId: number, friendId: number): Observable<void> {
    return this.http.delete<void>(`/accounts/${accountId}/friends/incoming/${friendId}`);
  }

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
