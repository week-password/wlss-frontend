import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { SessionStateService } from '@auth/services/state';
import { BaseComponent } from '@core/base-components';
import { ProfileComponent } from '@profile/components/profile';
import { TProfile } from '@profile/models/client';
import { ProfileService } from '@profile/services/client';
import { UserStateService } from '@root/services/state';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [NgIf, ProfileComponent],
})
export class ProfilePage extends BaseComponent implements OnInit {
  profile: TProfile | null = null;
  accountId: number | null = null;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionStateService: SessionStateService,
    private userStateService: UserStateService,
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
}
