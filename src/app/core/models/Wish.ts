import { FormControl } from '@angular/forms';

export interface IWish {
  id?: number;
  avatar: string | null;
  description: string;
  title: string;
}

export interface IWishFormGroup {
  avatar: FormControl<string | null>;
  description: FormControl<string>;
  title: FormControl<string>;
}
