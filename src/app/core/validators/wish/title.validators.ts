import { ValidatorFn, Validators } from '@angular/forms';

export const titleValidators: Array<ValidatorFn> = [
  Validators.required,
  Validators.minLength(1),
  Validators.maxLength(100),
];
