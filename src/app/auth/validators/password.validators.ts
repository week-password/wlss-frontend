import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { IPasswordsMatchError } from '@auth/models';

const passwordPattern = String.raw`[A-Za-zА-Яа-я0-9\x21-\x7E]*`;

export const passwordsMatchValidator = (anotherPasswordControl: AbstractControl): ValidatorFn => {
  return (passwordControl: AbstractControl): IPasswordsMatchError | null => {
    const password = passwordControl.value;
    const anotherPassword = anotherPasswordControl.value;
    if (
      !password ||
      !anotherPassword ||
      !passwordControl.touched ||
      !anotherPasswordControl.touched ||
      password === anotherPassword
    ) {
      return null;
    }
    return { passwordsmatch: { password, anotherPassword } };
  };
};

export const passwordValidators: Array<ValidatorFn> = [
  Validators.required,
  Validators.pattern(passwordPattern),
  Validators.minLength(8),
  Validators.maxLength(500),
];

export const getSignupPasswordValidators =
  (anotherPasswordControl: AbstractControl): Array<ValidatorFn> => [
    ...passwordValidators,
    passwordsMatchValidator(anotherPasswordControl),
  ];
