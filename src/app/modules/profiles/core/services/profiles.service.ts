import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IProfile } from 'src/app/core/models';
import { profiles } from 'src/app/core/services/mocks/profiles';
import { IProfilesFilter } from 'src/app/modules/profiles/core/models';

@Injectable({ providedIn: 'root' })
export class ProfilesService {
  getProfiles(filter: IProfilesFilter): Observable<IProfile[]> {
    const filteredProfiles: IProfile[] = profiles.filter((profile: IProfile) =>
      profile.account.login.toLowerCase().includes(filter.login) &&
      profile.name.toLowerCase().includes(filter.name)
    );
    return of(filteredProfiles);
  }
}
