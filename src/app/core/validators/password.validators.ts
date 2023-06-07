import { ValidatorFn, Validators } from '@angular/forms';

const passwordPattern = String.raw`[A-Za-zА-Яа-я0-9\x21-\x7E]*`;

export const passwordValidators: ValidatorFn[] = [
  Validators.required,
  Validators.pattern(passwordPattern),
  Validators.minLength(8),
  Validators.maxLength(500),
];
