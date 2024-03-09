import { FormControl, FormGroup } from '@angular/forms';

export type TSignupAccount = {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type TSignupProfile = {
  name: string;
  description: string | null;
}

export type TSignupData = {
  account: TSignupAccount;
  profile: TSignupProfile;
}

export type TSignupDataFormGroup = {
  account: FormGroup<{ [key in keyof TSignupAccount]: FormControl<TSignupAccount[key]> }>;
  profile: FormGroup<{ [key in keyof TSignupProfile]: FormControl<TSignupProfile[key]> }>;
}
