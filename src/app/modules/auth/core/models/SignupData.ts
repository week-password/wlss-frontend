import { FormControl } from '@angular/forms';

export interface ISignupData {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  description: string | null;
}

export interface ISignupDataFormGroup {
  login: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  name: FormControl<string>;
  description: FormControl<string | null>;
}
