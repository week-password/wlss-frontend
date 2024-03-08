import { FormControl, FormGroup } from '@angular/forms';

export interface ISignupAccount {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignupProfile {
  name: string;
  description: string | null;
}

export interface ISignupData {
  account: ISignupAccount;
  profile: ISignupProfile;
}

export interface ISignupDataFormGroup {
  account: FormGroup<{ [key in keyof ISignupAccount]: FormControl<ISignupAccount[key]> }>;
  profile: FormGroup<{ [key in keyof ISignupProfile]: FormControl<ISignupProfile[key]> }>;
}
