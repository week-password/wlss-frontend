export enum EBookingStatus {
  notBooked = 'notBooked',
  bookedByCurrentAccount = 'bookedByCurrentAccount',
  bookedByAnotherAccount = 'bookedByAnotherAccount',
}

export type TGetWishesResponse = Array<{
  id: number;
  avatarId: string | null;
  description: string;
  title: string;
  bookingId: number | null;
  bookingStatus: EBookingStatus;
}>

export type TCreateWishRequest = {
  avatarId: string | null;
  description: string;
  title: string;
}

export type TCreateWishResponse = {
  id: number;
  avatarId: string | null;
  description: string;
  title: string;
}

export type TUpdateWishRequest = {
  avatarId: string | null;
  description: string;
  title: string;
}

export type TUpdateWishResponse = {
  id: number;
  avatarId: string | null;
  description: string;
  title: string;
}
