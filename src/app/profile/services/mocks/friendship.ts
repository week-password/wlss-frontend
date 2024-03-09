import { TProfile } from '@profile/models/client';
import { profiles } from '@profiles/services/mocks/profiles';

export const friends: Array<TProfile> = profiles.filter(
  (profile: TProfile) => [2, 3, 4, 5, 6, 7, 8, 9, 10].includes(profile.account.id),
);

export const incomingRequests: Array<TProfile> = profiles.filter(
  (profile: TProfile) => [11, 12, 13].includes(profile.account.id),
);

export const outgoingRequests: Array<TProfile> = profiles.filter(
  (profile: TProfile) => [14, 15].includes(profile.account.id),
);
