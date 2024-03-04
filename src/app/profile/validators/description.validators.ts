import { ValidatorFn, Validators } from '@angular/forms';

export const descriptionValidators: Array<ValidatorFn> = [
  Validators.maxLength(1000),
];
