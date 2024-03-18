import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { CardComponent } from '@core/components/card';
import { ProfileActionsComponent } from '@profile/components/profile-actions';
import { TProfile } from '@profile/models/client';
import { ProfilesFilterComponent } from '@profiles/components/profiles-filter';
import { TProfilesFilter } from '@profiles/models/client';
import { ProfilesService } from '@profiles/services/client';

@Component({
  selector: 'app-profiles-page',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  imports: [CardComponent, NgFor, NgIf, ProfileActionsComponent, ProfilesFilterComponent, RouterLink],
})
export class ProfilesPage extends BaseComponent implements OnInit {
  profiles: Array<TProfile> = [];

  constructor(private profilesService: ProfilesService) {
    super();
  }

  ngOnInit(): void {
    this.getProfiles({ login: '', name: '' });
  }

  getProfiles(filter: TProfilesFilter): void {
    this.loading = true;
    this.profilesService.getProfiles(filter).pipe(
      takeUntil(this.destroy$),
      finalize(() => { this.loading = false; }),
    ).subscribe((profiles: Array<TProfile>) => {
      this.profiles = profiles;
    });
  }
}
