import { ValidatorFn, Validators } from '@angular/forms';

const emailPattern = String.raw`.+@.+\..+`;

export const emailValidators: ValidatorFn[] = [
  Validators.required,
  Validators.pattern(emailPattern),
  Validators.minLength(5),
  Validators.maxLength(200),
];
