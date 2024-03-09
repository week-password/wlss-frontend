import { FormControl } from '@angular/forms';

export type TProfilesFilter = {
  login: string;
  name: string;
}

export type TProfilesFilterFormGroup = {
  [key in keyof TProfilesFilter]: FormControl<TProfilesFilter[key]>;
}
