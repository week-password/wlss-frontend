import { FormControl } from '@angular/forms';

export interface ISigninData {
  login: string;
  password: string;
}

export interface ISigninDataFormGroup {
  login: FormControl<string>;
  password: FormControl<string>;
}
