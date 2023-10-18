import { FormControl } from '@angular/forms';

export interface IProfilesFilter {
  login: string;
  name: string;
}

export interface IProfilesFilterFormGroup {
  login: FormControl<string>;
  name: FormControl<string>;
}
