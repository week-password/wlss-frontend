export enum EFriendshipStatus {
  notRequested = 'notRequested',
  acceptedRequest = 'acceptedRequest',
  incomingRequest = 'incomingRequest',
  outgoingRequest = 'outgoingRequest',
}

export type TGetProfileResponse = {
  account: {
    id: number;
    login: string;
  };
  avatarId: string | null;
  description: string | null;
  name: string;
  friendshipStatus: EFriendshipStatus | null;
}

export type TUpdateProfileRequest = {
  avatarId: string | null;
  description: string | null;
  name: string;
}

export type TUpdateProfileResponse = {
  avatarId: string | null;
  description: string | null;
  name: string;
}
