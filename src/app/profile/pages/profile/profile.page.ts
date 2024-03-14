import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { CardComponent } from '@core/components/card';
import { EBlockState } from '@core/models/client';
import { ProfileActionsComponent } from '@profile/components/profile-actions';
import { ProfileBlockComponent } from '@profile/components/profile-block';
import { ShortProfileCardComponent } from '@profile/components/short-profile-card';
import { TAccount, TProfile } from '@profile/models/client';
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
  account: TAccount | null = null;
  friends: Array<TProfile> = [];
  incomingRequests: Array<TProfile> = [];
  outgoingRequests: Array<TProfile> = [];

  constructor(
    private friendshipService: FriendshipService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private userStateService: UserStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeOnRouteParamsChanges();
    this.subscribeOnAccountChanges();
    this.getFriends();
    this.getIncomingRequests();
    this.getOutgoingRequests();
  }

  private subscribeOnRouteParamsChanges(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$),
    ).subscribe((params: Params) => {
      this.getProfile(params?.login);
    });
  }

  private subscribeOnAccountChanges(): void {
    this.userStateService.account.pipe(
      takeUntil(this.destroy$),
    ).subscribe((account: TAccount | null) => {
      this.account = account;
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
      },
      error: () => {
        this.router.navigate(['404']);
      },
    });
  }

  private getFriends(): void {
    this.friendshipService.getFriends().pipe(
      takeUntil(this.destroy$),
    ).subscribe((friends: Array<TProfile>) => {
      this.friends = friends;
    });
  }

  private getIncomingRequests(): void {
    this.friendshipService.getIncomingRequests().pipe(
      takeUntil(this.destroy$),
    ).subscribe((incomingRequests: Array<TProfile>) => {
      this.incomingRequests = incomingRequests;
    });
  }

  private getOutgoingRequests(): void {
    this.friendshipService.getOutgoingRequests().pipe(
      takeUntil(this.destroy$),
    ).subscribe((outgoingRequests: Array<TProfile>) => {
      this.outgoingRequests = outgoingRequests;
    });
  }
}
