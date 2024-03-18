import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { takeUntil } from 'rxjs';

import { SessionStateService } from '@auth/services/state';
import { BaseComponent } from '@core/base-components';
import { CardComponent } from '@core/components/card';
import { EBlockState } from '@core/models/client';
import { ProfileActionsComponent } from '@profile/components/profile-actions';
import { ProfileBlockComponent } from '@profile/components/profile-block';
import { ShortProfileCardComponent } from '@profile/components/short-profile-card';
import { EFriendshipStatus, TProfile } from '@profile/models/client';
import { FriendshipService, ProfileService } from '@profile/services/client';
import { UserStateService } from '@root/services/state';
import { WishListComponent } from '@wish/components/wish-list';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
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
export class ProfilePage extends BaseComponent implements OnInit {
  EBlockState = EBlockState;
  profile: TProfile | null = null;
  accountId: number;
  acceptedRequests: Array<TProfile> = [];
  incomingRequests: Array<TProfile> = [];
  outgoingRequests: Array<TProfile> = [];

  constructor(
    private friendshipService: FriendshipService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionStateService: SessionStateService,
    private userStateService: UserStateService,
  ) {
    super();
    const { accountId } = this.sessionStateService;
    if (!accountId) {
      this.router.navigate(['signin']);
      return;
    }
    this.accountId = accountId;
  }

  get showAcceptedRequests(): boolean {
    return this.profile?.account.id === this.accountId || this.acceptedRequests.length !== 0;
  }

  ngOnInit(): void {
    this.subscribeOnRouteParamsChanges();
  }

  acceptIncomingRequest(): void {
    if (!this.profile) {
      return;
    }
    this.friendshipService.acceptIncomingRequest(this.accountId, this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.profile!.friendshipStatus = EFriendshipStatus.acceptedRequest;
      this.getAcceptedRequests();
    });
  }

  rejectIncomingRequest(): void {
    if (!this.profile) {
      return;
    }
    this.friendshipService.rejectIncomingRequest(this.accountId, this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.profile!.friendshipStatus = EFriendshipStatus.notRequested;
    });
  }

  createOutgoingRequest(): void {
    if (!this.profile) {
      return;
    }
    this.friendshipService.createOutgoingRequest(this.accountId, this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.profile!.friendshipStatus = EFriendshipStatus.outgoingRequest;
    });
  }

  cancelOutgoingRequest(): void {
    if (!this.profile) {
      return;
    }
    this.friendshipService.cancelOutgoingRequest(this.accountId, this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.profile!.friendshipStatus = EFriendshipStatus.notRequested;
    });
  }

  removeAcceptedRequest(): void {
    if (!this.profile) {
      return;
    }
    this.friendshipService.removeAcceptedRequest(this.accountId, this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.profile!.friendshipStatus = EFriendshipStatus.notRequested;
      this.getAcceptedRequests();
    });
  }

  private subscribeOnRouteParamsChanges(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$),
    ).subscribe((params: Params) => {
      this.getProfile(params?.login);
    });
  }

  private getProfile(login: string | null): void {
    const profileSource = login ?
      this.profileService.getProfileByLogin(login) :
      this.userStateService.profile;

    profileSource.pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (profile: TProfile | null) => {
        this.profile = profile;
        this.getAcceptedRequests();
        if (this.profile?.account.id === this.accountId) {
          this.getIncomingRequests();
          this.getOutgoingRequests();
        }
      },
      error: () => {
        this.router.navigate(['404']);
      },
    });
  }

  private getAcceptedRequests(): void {
    if (!this.profile) {
      return;
    }
    this.friendshipService.getAcceptedRequests(this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe((acceptedRequests: Array<TProfile>) => {
      this.acceptedRequests = acceptedRequests;
    });
  }

  private getIncomingRequests(): void {
    if (!this.profile) {
      return;
    }
    this.friendshipService.getIncomingRequests(this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe((incomingRequests: Array<TProfile>) => {
      this.incomingRequests = incomingRequests;
    });
  }

  private getOutgoingRequests(): void {
    if (!this.profile) {
      return;
    }
    this.friendshipService.getOutgoingRequests(this.profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe((outgoingRequests: Array<TProfile>) => {
      this.outgoingRequests = outgoingRequests;
    });
  }
}
