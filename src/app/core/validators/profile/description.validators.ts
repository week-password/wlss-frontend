import { ValidatorFn, Validators } from '@angular/forms';

export const descriptionValidators: ValidatorFn[] = [
  Validators.maxLength(1000),
];
