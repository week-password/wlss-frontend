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
