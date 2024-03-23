import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';

import { AuthService } from '@auth/services/client';
import { SessionStateService } from '@auth/services/state';
import { BaseComponent } from '@core/base-components';
import { AvatarComponent } from '@core/components/avatar';
import { LoaderComponent } from '@core/components/loader';
import { OverlayComponent } from '@core/components/overlay';
import { EOverlayPosition, TDropdownItem } from '@core/models/client';
import { TProfile } from '@profile/models/client';
import { ProfileService } from '@profile/services/client';
import { UserStateService } from '@root/services/state';

const imports = [
  AvatarComponent,
  CdkOverlayOrigin,
  LoaderComponent,
  NgFor,
  NgIf,
  OverlayComponent,
];
@Component({
  imports,
  selector: 'app-authorized-user',
  standalone: true,
  styleUrl: 'authorized-user.component.scss',
  templateUrl: 'authorized-user.component.html',
})
export class AuthorizedUserComponent extends BaseComponent implements OnInit {
  profile: TProfile | null = null;
  menuItems: Array<TDropdownItem> = [
    { value: 'Профиль', action: this.goToProfile.bind(this) },
    { value: 'Выход', action: this.signout.bind(this) },
  ];
  readonly EOverlayPosition = EOverlayPosition;

  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
    private readonly router: Router,
    private readonly sessionStateService: SessionStateService,
    private readonly userStateService: UserStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAuthorizedUser();
    this.subscribeOnProfileChanges();
  }

  private getAuthorizedUser(): void {
    const { accountId } = this.sessionStateService;
    if (!accountId) {
      this.router.navigate(['signin']);
      return;
    }
    this.loading = true;
    this.profileService.getProfileByAccountId(accountId).pipe(
      takeUntil(this.destroy$),
      finalize(() => { this.loading = false; }),
    ).subscribe((profile: TProfile) => {
      this.userStateService.setAccount(profile.account);
      this.userStateService.setProfile(profile);
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

  private signout(): void {
    this.authService.signout().pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.userStateService.setAccount(null);
      this.userStateService.setProfile(null);
      this.router.navigate(['signin']);
    });
  }
}
