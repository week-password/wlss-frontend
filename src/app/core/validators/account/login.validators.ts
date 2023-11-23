import { ValidatorFn, Validators } from '@angular/forms';

const loginPattern = String.raw`[A-Za-z0-9_-]*`;

export const loginValidators: Array<ValidatorFn> = [
  Validators.required,
  Validators.pattern(loginPattern),
  Validators.minLength(1),
  Validators.maxLength(50),
];
