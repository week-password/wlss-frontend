import { ValidatorFn, Validators } from '@angular/forms';

const namePattern = String.raw`[A-Za-zА-Яа-я0-9'-.() ]*`;

export const nameValidators: Array<ValidatorFn> = [
  Validators.required,
  Validators.pattern(namePattern),
  Validators.minLength(1),
  Validators.maxLength(100),
];
