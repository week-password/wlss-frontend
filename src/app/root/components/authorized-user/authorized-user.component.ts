import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { AvatarComponent } from '@core/components/avatar';
import { OverlayComponent } from '@core/components/overlay';
import { EOverlayPosition, TDropdownItem } from '@core/models/client';
import { ProfileSettingsComponent } from '@profile/components/profile-settings';
import { TAccount, TProfile } from '@profile/models/client';
import { ProfileService } from '@profile/services/client';
import { AccountService } from '@root/services/client';
import { UserStateService } from '@root/services/state';

@Component({
  selector: 'app-authorized-user',
  templateUrl: './authorized-user.component.html',
  styleUrls: ['./authorized-user.component.scss'],
  standalone: true,
  imports: [
    AvatarComponent,
    CdkOverlayOrigin,
    NgFor,
    NgIf,
    OverlayComponent,
    ProfileSettingsComponent,
  ],
})
export class AuthorizedUserComponent extends BaseComponent implements OnInit {
  @ViewChild('profileSettings') profileSettings: ProfileSettingsComponent;

  account: TAccount | null = null;
  profile: TProfile | null = null;
  menuOpened = false;
  menuItems: Array<TDropdownItem> = [
    {
      value: 'Профиль',
      action: this.goToProfile.bind(this),
    },
    {
      value: 'Настройки',
      action: this.openProfileSettings.bind(this),
    },
    {
      value: 'Выход',
      action: this.logout.bind(this),
    },
  ];
  EOverlayPosition = EOverlayPosition;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private profileService: ProfileService,
    private userStateService: UserStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAuthorizedUser();
    this.subscribeOnAccountChanges();
    this.subscribeOnProfileChanges();
  }

  private getAuthorizedUser(): void {
    this.accountService.getAccount().pipe(
      takeUntil(this.destroy$),
    ).subscribe((account: TAccount) => {
      this.userStateService.setAccount(account);
      this.profileService.getProfile(account.login).pipe(
        takeUntil(this.destroy$),
      ).subscribe((profile: TProfile | null) => {
        this.userStateService.setProfile(profile);
      });
    });
  }

  private subscribeOnAccountChanges(): void {
    this.userStateService.account.pipe(
      takeUntil(this.destroy$),
    ).subscribe((account: TAccount | null) => {
      this.account = account;
    });
  }

  private subscribeOnProfileChanges(): void {
    this.userStateService.profile.pipe(
      takeUntil(this.destroy$),
    ).subscribe((profile: TProfile | null) => {
      this.profile = profile;
    });
  }

  private goToProfile(): void {
    this.router.navigate(['profile']);
  }

  private openProfileSettings(): void {
    this.profileSettings.openDialog();
  }

  private logout(): void {
    this.userStateService.setAccount(null);
    this.userStateService.setProfile(null);
    this.router.navigate(['signin']);
  }
}
