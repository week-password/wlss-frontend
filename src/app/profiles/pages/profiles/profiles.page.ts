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

const imports = [
  CardComponent,
  LoaderComponent,
  NgFor,
  NgIf,
  ProfileActionsComponent,
  ProfilesFilterComponent,
  RouterLink,
];
@Component({
  imports,
  selector: 'app-profiles-page',
  standalone: true,
  styleUrl: 'profiles.page.scss',
  templateUrl: 'profiles.page.html',
})
export class ProfilesPage extends BaseComponent implements OnInit {
  filteredProfiles: Array<TProfile> = [];

  private profiles: Array<TProfile> = [];
  private readonly accountId: number;

  constructor(
    private readonly friendshipService: FriendshipService,
    private readonly profilesService: ProfilesService,
    private readonly router: Router,
    private readonly sessionStateService: SessionStateService,
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

  private getProfiles(): void {
    this.loading = true;
    this.profilesService.getProfiles().pipe(
      takeUntil(this.destroy$),
      finalize(() => { this.loading = false; }),
    ).subscribe((profiles: Array<TProfile>) => {
      this.profiles = profiles;
      this.filteredProfiles = profiles;
    });
  }
}
