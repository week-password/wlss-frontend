import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs';

import { EBlockState, IProfile } from '@core/models';
import { FriendshipService, ProfileService } from '@core/services';
import { ProfileStateService, UserStateService } from '@core/state';
import { BaseComponent } from '@shared/base-components';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseComponent implements OnInit {
  EBlockState = EBlockState;
  profile: IProfile | null = null;
  friends: Array<IProfile> = [];
  incomingRequests: Array<IProfile> = [];
  outgoingRequests: Array<IProfile> = [];

  constructor(
    private friendshipService: FriendshipService,
    private profileService: ProfileService,
    private profileStateService: ProfileStateService,
    private route: ActivatedRoute,
    private userStateService: UserStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeOnRouteParamsChanges();
    this.subscribeOnProfileChanges();
    this.getFriends();
    this.getIncomingRequests();
    this.getOutgoingRequests();
  }

  private subscribeOnRouteParamsChanges(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params: Params) => {
      this.getProfile(params?.login);
    });
  }

  private subscribeOnProfileChanges(): void {
    this.profileStateService.profile.pipe(
      takeUntil(this.destroy$)
    ).subscribe((profile: IProfile | null) => {
      this.profile = profile;
    });
  }

  private getProfile(login: string | null): void {
    const profileSource = login ?
      this.profileService.getProfile(login) :
      this.userStateService.profile;

    profileSource.pipe(
      takeUntil(this.destroy$)
    ).subscribe((profile: IProfile | null) => {
      this.profileStateService.setProfile(profile);
    });
  }

  private getFriends(): void {
    this.friendshipService.getFriends().pipe(
      takeUntil(this.destroy$)
    ).subscribe((friends: Array<IProfile>) => {
      this.friends = friends;
    });
  }

  private getIncomingRequests(): void {
    this.friendshipService.getIncomingRequests().pipe(
      takeUntil(this.destroy$)
    ).subscribe((incomingRequests: Array<IProfile>) => {
      this.incomingRequests = incomingRequests;
    });
  }

  private getOutgoingRequests(): void {
    this.friendshipService.getOutgoingRequests().pipe(
      takeUntil(this.destroy$)
    ).subscribe((outgoingRequests: Array<IProfile>) => {
      this.outgoingRequests = outgoingRequests;
    });
  }
}
