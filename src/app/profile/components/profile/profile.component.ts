import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { CardComponent } from '@core/components/card';
import { EBlockState } from '@core/models/client';
import { ProfileActionsComponent } from '@profile/components/profile-actions';
import { ProfileBlockComponent } from '@profile/components/profile-block';
import { ShortProfileCardComponent } from '@profile/components/short-profile-card';
import { EFriendshipStatus, TProfile } from '@profile/models/client';
import { FriendshipService } from '@profile/services/client';
import { WishListComponent } from '@wish/components/wish-list';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    CardComponent,
    NgFor,
    NgIf,
    ProfileActionsComponent,
    ProfileBlockComponent,
    RouterLink,
    ShortProfileCardComponent,
    WishListComponent,
  ],
})
export class ProfileComponent extends BaseComponent implements OnInit {
  @Input() accountId: number;
  @Input() profile: TProfile;

  acceptedRequests: Array<TProfile> = [];
  incomingRequests: Array<TProfile> = [];
  outgoingRequests: Array<TProfile> = [];
  readonly EBlockState = EBlockState;

  constructor(private friendshipService: FriendshipService) {
    super();
  }

  get showAcceptedRequests(): boolean {
    return this.profile.account.id === this.accountId || this.acceptedRequests.length !== 0;
  }

  ngOnInit(): void {
    this.getAcceptedRequests();
    if (this.profile.account.id === this.accountId) {
      this.getIncomingRequests();
      this.getOutgoingRequests();
    }
  }

  acceptIncomingRequest(): void {
    this.friendshipService.acceptIncomingRequest(this.accountId, this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.profile.friendshipStatus = EFriendshipStatus.acceptedRequest;
      this.getAcceptedRequests();
    });
  }

  rejectIncomingRequest(): void {
    this.friendshipService.rejectIncomingRequest(this.accountId, this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.profile.friendshipStatus = EFriendshipStatus.notRequested;
    });
  }

  createOutgoingRequest(): void {
    this.friendshipService.createOutgoingRequest(this.accountId, this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.profile.friendshipStatus = EFriendshipStatus.outgoingRequest;
    });
  }

  cancelOutgoingRequest(): void {
    this.friendshipService.cancelOutgoingRequest(this.accountId, this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.profile.friendshipStatus = EFriendshipStatus.notRequested;
    });
  }

  removeAcceptedRequest(): void {
    this.friendshipService.removeAcceptedRequest(this.accountId, this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.profile.friendshipStatus = EFriendshipStatus.notRequested;
      this.getAcceptedRequests();
    });
  }

  private getAcceptedRequests(): void {
    this.friendshipService.getAcceptedRequests(this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe((acceptedRequests: Array<TProfile>) => {
      this.acceptedRequests = acceptedRequests;
    });
  }

  private getIncomingRequests(): void {
    this.friendshipService.getIncomingRequests(this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe((incomingRequests: Array<TProfile>) => {
      this.incomingRequests = incomingRequests;
    });
  }

  private getOutgoingRequests(): void {
    this.friendshipService.getOutgoingRequests(this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe((outgoingRequests: Array<TProfile>) => {
      this.outgoingRequests = outgoingRequests;
    });
  }
}