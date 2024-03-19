import { TWish } from '@wish/models/client';

import { wishes } from './wishes';

export const bookedByCurrentAccount: Array<TWish> = wishes.filter(
  (wish: TWish) => wish.id && [4, 6].includes(wish.id),
);
export const bookedByAnotherAccount: Array<TWish> = wishes.filter(
  (wish: TWish) => wish.id && [2].includes(wish.id),
);
