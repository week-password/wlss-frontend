import { FormControl } from '@angular/forms';

export interface IProfile {
  avatar: string | null;
  description: string | null;
  name: string;
}

export interface IProfileFormGroup {
  avatar: FormControl<string | null>;
  description: FormControl<string | null>;
  name: FormControl<string>;
}
