import { IProfile } from 'src/app/core/models/Profile';

import { profiles } from './profiles';

export const friends: IProfile[] = profiles.filter(
  (profile: IProfile) => [2, 3, 4, 5, 6, 7, 8, 9, 10].includes(profile.account.id)
);

export const incomingRequests: IProfile[] = profiles.filter(
  (profile: IProfile) => [11, 12, 13].includes(profile.account.id)
);

export const outgoingRequests: IProfile[] =  profiles.filter(
  (profile: IProfile) => [14, 15].includes(profile.account.id)
);
