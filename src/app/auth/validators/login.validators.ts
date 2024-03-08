import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, first, Observable, of, switchMap } from 'rxjs';

import { SignupService } from '@auth/services/client';

const loginPattern = String.raw`[A-Za-z0-9_-]*`;

export const loginValidators: Array<ValidatorFn> = [
  Validators.required,
  Validators.pattern(loginPattern),
  Validators.minLength(1),
  Validators.maxLength(50),
];

export const unavailableLoginValidator = (signupService: SignupService): AsyncValidatorFn => {
  return (loginControl: AbstractControl<string>): Observable<ValidationErrors | null> => {
    return loginControl.valueChanges.pipe(
      debounceTime(500),
      first(),
      switchMap((login: string) => signupService.isLoginUnavailable(login).pipe(
        switchMap((isLoginUnavailable: boolean) => isLoginUnavailable ? of({ 'unavailablelogin': login }) : of(null)),
      )),
    );
  };
};
