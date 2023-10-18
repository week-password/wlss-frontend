import { Component, OnInit } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';

import { IProfile } from 'src/app/core/models';
import { IProfilesFilter } from 'src/app/modules/profiles/core/models';
import { ProfilesService } from 'src/app/modules/profiles/core/services';
import { BaseComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent extends BaseComponent implements OnInit {
  profiles: IProfile[] = [];

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
    ).subscribe((profiles: IProfile[]) => {
      this.profiles = profiles;
    });
  }
}
