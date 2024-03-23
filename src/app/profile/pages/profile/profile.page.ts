import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { SessionStateService } from '@auth/services/state';
import { BaseComponent } from '@core/base-components';
import { LoaderComponent } from '@core/components/loader';
import { ProfileComponent } from '@profile/components/profile';
import { TProfile } from '@profile/models/client';
import { ProfileService } from '@profile/services/client';
import { UserStateService } from '@root/services/state';

const imports = [LoaderComponent, NgIf, ProfileComponent];
@Component({
  imports,
  selector: 'app-profile-page',
  standalone: true,
  styleUrl: 'profile.page.scss',
  templateUrl: 'profile.page.html',
})
export class ProfilePage extends BaseComponent implements OnInit {
  profile: TProfile | null = null;
  accountId: number | null = null;

  constructor(
    private readonly profileService: ProfileService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly sessionStateService: SessionStateService,
    private readonly userStateService: UserStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAccountId();
    this.subscribeOnRouteParamsChanges();
  }

  private getAccountId(): void {
    const { accountId } = this.sessionStateService;
    if (!accountId) {
      this.router.navigate(['signin']);
      return;
    }
    this.accountId = accountId;
  }

  private subscribeOnRouteParamsChanges(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$),
    ).subscribe((params: Params) => {
      this.getProfile(params?.login);
    });
  }

  private getProfile(login: string | null): void {
    this.profile = null;

    const profileSource = login ?
      this.profileService.getProfileByLogin(login) :
      this.userStateService.profile;

    this.loading = true;
    profileSource.pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (profile: TProfile | null) => {
        this.loading = false;
        this.profile = profile;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['404']);
      },
    });
  }
}
