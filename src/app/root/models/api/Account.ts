export type TGetAccountsRequest = {
  id: Array<number>;
  login: Array<string>;
}

export type TGetAccountsResponse = Array<{
  id: number;
  login: string;
}>
