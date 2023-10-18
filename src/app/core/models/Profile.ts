import { FormControl } from '@angular/forms';

import { IAccount } from './Account';

export interface IProfile {
  account: IAccount;
  avatar: string | null;
  description: string | null;
  name: string;
}

export interface IProfileFormGroup {
  avatar: FormControl<string | null>;
  description: FormControl<string | null>;
  name: FormControl<string>;
}
