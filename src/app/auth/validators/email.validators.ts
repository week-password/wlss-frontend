import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of, switchMap } from 'rxjs';

import { SignupService } from '@auth/services/client';

const emailPattern = String.raw`.+@.+\..+`;

export const emailValidators: Array<ValidatorFn> = [
  Validators.required,
  Validators.pattern(emailPattern),
  Validators.minLength(5),
  Validators.maxLength(200),
];

export const unavailableEmailValidator = (signupService: SignupService): AsyncValidatorFn => {
  return (emailControl: AbstractControl): Observable<ValidationErrors | null> => {
    const email = emailControl.value;
    return signupService.isEmailUnavailable(email).pipe(
      switchMap((isEmailUnavailable: boolean) => isEmailUnavailable ? of({ 'unavailableemail': email }) : of(null)),
    );
  };
};
