import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of, switchMap } from 'rxjs';

import { SignupService } from '@auth/services/client';

const loginPattern = String.raw`[A-Za-z0-9_-]*`;

export const loginValidators: Array<ValidatorFn> = [
  Validators.required,
  Validators.pattern(loginPattern),
  Validators.minLength(1),
  Validators.maxLength(50),
];

export const unavailableLoginValidator = (signupService: SignupService): AsyncValidatorFn => {
  return (loginControl: AbstractControl): Observable<ValidationErrors | null> => {
    const login = loginControl.value;
    return signupService.isLoginUnavailable(login).pipe(
      switchMap((isLoginUnavailable: boolean) => isLoginUnavailable ? of({ 'unavailablelogin': login }) : of(null)),
    );
  };
};
