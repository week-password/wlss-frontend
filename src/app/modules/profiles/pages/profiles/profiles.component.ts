import { Component, OnInit } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';

import { IProfile, IProfileFriendshipStatus, IProfilesFilter } from '@core/models';
import { ProfilesService } from '@core/services';
import { BaseComponent } from '@shared/base-components';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent extends BaseComponent implements OnInit {
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
      finalize(() => { this.loading = false; })
    ).subscribe((profiles: Array<IProfile & IProfileFriendshipStatus>) => {
      this.profiles = profiles;
    });
  }
}
