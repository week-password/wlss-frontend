export type TSigninRequest = {
  email: string | null;
  login: string | null;
  password: string;
}

export type TSigninResponse = {
  session: {
    id: string;
    accountId: number;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export type TRefreshTokensResponse = {
  accessToken: string;
  refreshToken: string;
}
