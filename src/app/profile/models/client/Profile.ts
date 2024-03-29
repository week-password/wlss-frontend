import { FormControl } from '@angular/forms';

import { TAccount } from './Account';
import { EFriendshipStatus } from './FriendshipStatus';

export type TProfile = {
  account: TAccount;
  avatarId: string | null;
  description: string | null;
  name: string;
  friendshipStatus: EFriendshipStatus | null;
}

export type TProfileFormGroup = {
  [key in keyof Omit<TProfile, 'account' | 'friendshipStatus'>]: FormControl<TProfile[key]>;
}
