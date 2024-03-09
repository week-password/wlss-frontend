import { FormControl } from '@angular/forms';

export type TSigninData = {
  login: string;
  password: string;
}

export type TSigninDataFormGroup = {
  [key in keyof TSigninData]: FormControl<TSigninData[key]>;
};
