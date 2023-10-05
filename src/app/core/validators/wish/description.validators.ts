import { ValidatorFn, Validators } from '@angular/forms';

export const descriptionValidators: ValidatorFn[] = [
  Validators.required,
  Validators.maxLength(1000),
];
