import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';

import { SessionStateService } from '@auth/services/state';
import { BaseComponent } from '@core/base-components';
import { CardComponent } from '@core/components/card';
import { LoaderComponent } from '@core/components/loader';
import { ProfileActionsComponent } from '@profile/components/profile-actions';
import { EFriendshipStatus, TProfile } from '@profile/models/client';
import { FriendshipService } from '@profile/services/client';
import { ProfilesFilterComponent } from '@profiles/components/profiles-filter';
import { TProfilesFilter } from '@profiles/models/client';
import { ProfilesService } from '@profiles/services/client';

@Component({
  selector: 'app-profiles-page',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  imports: [
    CardComponent,
    LoaderComponent,
    NgFor,
    NgIf,
    ProfileActionsComponent,
    ProfilesFilterComponent,
    RouterLink,
  ],
})
export class ProfilesPage extends BaseComponent implements OnInit {
  accountId: number;
  profiles: Array<TProfile> = [];
  filteredProfiles: Array<TProfile> = [];

  constructor(
    private friendshipService: FriendshipService,
    private profilesService: ProfilesService,
    private router: Router,
    private sessionStateService: SessionStateService,
  ) {
    super();
    const accountId = this.sessionStateService.accountId;
    if (!accountId) {
      this.router.navigate(['signin']);
      return;
    }
    this.accountId = accountId;
  }

  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles(): void {
    this.loading = true;
    this.profilesService.getProfiles().pipe(
      takeUntil(this.destroy$),
      finalize(() => { this.loading = false; }),
    ).subscribe((profiles: Array<TProfile>) => {
      this.profiles = profiles;
      this.filteredProfiles = profiles;
    });
  }

  getFilteredProfiles(filter: TProfilesFilter): void {
    this.filteredProfiles = this.profiles.filter((profile: TProfile) =>
      profile.account.login.toLowerCase().includes(filter.login) &&
      profile.name.toLowerCase().includes(filter.name),
    );
  }

  acceptIncomingRequest(profile: TProfile): void {
    this.friendshipService.acceptIncomingRequest(this.accountId, profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      profile.friendshipStatus = EFriendshipStatus.acceptedRequest;
    });
  }

  rejectIncomingRequest(profile: TProfile): void {
    this.friendshipService.rejectIncomingRequest(this.accountId, profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      profile.friendshipStatus = EFriendshipStatus.notRequested;
    });
  }

  createOutgoingRequest(profile: TProfile): void {
    this.friendshipService.createOutgoingRequest(this.accountId, profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      profile.friendshipStatus = EFriendshipStatus.outgoingRequest;
    });
  }

  cancelOutgoingRequest(profile: TProfile): void {
    this.friendshipService.cancelOutgoingRequest(this.accountId, profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      profile.friendshipStatus = EFriendshipStatus.notRequested;
    });
  }

  removeAcceptedRequest(profile: TProfile): void {
    this.friendshipService.removeAcceptedRequest(this.accountId, profile.account.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      profile.friendshipStatus = EFriendshipStatus.notRequested;
    });
  }
}
