export type TSignupRequest = {
  account: {
    login: string;
    email: string;
    password: string;
  };
  profile: {
    name: string;
    description: string | null;
  };
}
