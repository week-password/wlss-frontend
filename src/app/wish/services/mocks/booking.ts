import { TWish } from '@wish/models/client';

import { wishes } from './wishes';

export const bookedByCurrentUser: Array<TWish> = wishes.filter(
  (wish: TWish) => wish.id && [4, 6].includes(wish.id),
);
export const bookedByAnotherUser: Array<TWish> = wishes.filter(
  (wish: TWish) => wish.id && [2].includes(wish.id),
);
