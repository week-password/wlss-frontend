import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IProfile } from '@core/models';
import { profiles } from '@core/services/mocks/profiles';
import { IProfilesFilter } from '@modules/profiles/core/models';

@Injectable({ providedIn: 'root' })
export class ProfilesService {
  getProfiles(filter: IProfilesFilter): Observable<Array<IProfile>> {
    const filteredProfiles: Array<IProfile> = profiles.filter((profile: IProfile) =>
      profile.account.login.toLowerCase().includes(filter.login) &&
      profile.name.toLowerCase().includes(filter.name)
    );
    return of(filteredProfiles);
  }
}
