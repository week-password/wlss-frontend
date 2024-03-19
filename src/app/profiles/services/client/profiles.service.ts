import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TProfile } from '@profile/models/client';
import { ProfilesApiService } from '@profiles/services/api';

@Injectable({ providedIn: 'root' })
export class ProfilesService {
  constructor(private profilesApiService: ProfilesApiService) { }

  getProfiles(): Observable<Array<TProfile>> {
    return this.profilesApiService.getProfiles();
  }
}
