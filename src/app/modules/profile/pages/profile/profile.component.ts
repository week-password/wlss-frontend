import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs';

import { EBlockState, IProfile } from 'src/app/core/models';
import { FriendshipService, ProfileService, ProfileSettingsService } from 'src/app/core/services';
import { UserStateService } from 'src/app/core/state';
import { ProfileSettingsComponent } from 'src/app/modules/profile/components/profile-settings/profile-settings.component';
import { WishFormComponent } from 'src/app/modules/profile/components/wish-form/wish-form.component';
import { ProfileStateService } from 'src/app/modules/profile/core/state';
import { BaseComponent } from 'src/app/modules/shared/base-components';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseComponent implements OnInit {
  @ViewChild ('profileSettings') profileSettings: ProfileSettingsComponent;
  @ViewChild ('wishForm') wishForm: WishFormComponent;

  EBlockState = EBlockState;
  profile: IProfile | null = null;
  friends: IProfile[] = [];
  incomingRequests: IProfile[] = [];
  outgoingRequests: IProfile[] = [];

  constructor(
    private friendshipService: FriendshipService,
    private profileService: ProfileService,
    private profileSettingsService: ProfileSettingsService,
    private profileStateService: ProfileStateService,
    private route: ActivatedRoute,
    private userStateService: UserStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeOnRouteParamsChanges();
    this.subscribeOnOpenProfileSettingsEvent();
    this.subscribeOnProfileChanges();
    this.getFriends();
    this.getIncomingRequests();
    this.getOutgoingRequests();
  }

  openAddWishDialog(): void {
    this.wishForm.openDialog();
  }

  private subscribeOnRouteParamsChanges(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params: Params) => {
      this.getProfile(params?.login);
    });
  }

  private subscribeOnOpenProfileSettingsEvent(): void {
    this.profileSettingsService.openProfileSettingsEventObserver.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.profileSettings.openDialog();
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
    ).subscribe((friends: IProfile[]) => {
      this.friends = friends;
    });
  }

  private getIncomingRequests(): void {
    this.friendshipService.getIncomingRequests().pipe(
      takeUntil(this.destroy$)
    ).subscribe((incomingRequests: IProfile[]) => {
      this.incomingRequests = incomingRequests;
    });
  }

  private getOutgoingRequests(): void {
    this.friendshipService.getOutgoingRequests().pipe(
      takeUntil(this.destroy$)
    ).subscribe((outgoingRequests: IProfile[]) => {
      this.outgoingRequests = outgoingRequests;
    });
  }
}
