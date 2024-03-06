import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { CardComponent } from '@core/components/card';
import { LinkDirective } from '@core/directives';
import { ProfileActionsComponent } from '@profile/components/profile-actions';
import { IProfile, IProfileFriendshipStatus } from '@profile/models';
import { ProfilesFilterComponent } from '@profiles/components/profiles-filter';
import { IProfilesFilter } from '@profiles/models';
import { ProfilesService } from '@profiles/services/client';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  imports: [
    CardComponent,
    LinkDirective,
    NgFor,
    NgIf,
    ProfileActionsComponent,
    ProfilesFilterComponent,
  ],
})
export class ProfilesPage extends BaseComponent implements OnInit {
  profiles: Array<IProfile & IProfileFriendshipStatus> = [];

  constructor(private profilesService: ProfilesService) {
    super();
  }

  ngOnInit(): void {
    this.getProfiles({ login: '', name: '' });
  }

  getProfiles(filter: IProfilesFilter): void {
    this.loading = true;
    this.profilesService.getProfiles(filter).pipe(
      takeUntil(this.destroy$),
      finalize(() => { this.loading = false; }),
    ).subscribe((profiles: Array<IProfile & IProfileFriendshipStatus>) => {
      this.profiles = profiles;
    });
  }
}
