import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, first, Observable, of, switchMap } from 'rxjs';

import { SignupService } from '@auth/services/client';

const emailPattern = String.raw`.+@.+\..+`;

export const emailValidators: Array<ValidatorFn> = [
  Validators.required,
  Validators.pattern(emailPattern),
  Validators.minLength(5),
  Validators.maxLength(200),
];

export const unavailableEmailValidator = (signupService: SignupService): AsyncValidatorFn => {
  return (emailControl: AbstractControl<string>): Observable<ValidationErrors | null> => {
    return emailControl.valueChanges.pipe(
      debounceTime(500),
      first(),
      switchMap((email: string) => signupService.isEmailUnavailable(email).pipe(
        switchMap((isEmailUnavailable: boolean) => isEmailUnavailable ? of({ 'unavailableemail': email }) : of(null)),
      )),
    );
  };
};
