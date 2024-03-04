import { IWish } from '@wish/models';

import { wishes } from './wishes';

export const bookedByCurrentUser: Array<IWish> = wishes.filter(
  (wish: IWish) => wish.id && [4, 6].includes(wish.id),
);
export const bookedByAnotherUser: Array<IWish> = wishes.filter(
  (wish: IWish) => wish.id && [2].includes(wish.id),
);
