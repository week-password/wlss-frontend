import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import {
  emailValidators,
  getSignupPasswordValidators,
  loginValidators,
} from 'src/app/core/validators/account';
import {
  descriptionValidators,
  nameValidators,
} from 'src/app/core/validators/profile';
import { ESignupStep, ISignupDataFormGroup } from 'src/app/modules/auth/core/models';
import { BaseFormComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BaseFormComponent<ISignupDataFormGroup> implements OnInit {
  ESignupStep = ESignupStep;
  currentSignupStep = ESignupStep.main;

  constructor(
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initSignUpForm();
    this.subscribeOnPasswordsChanges();
  }

  initSignUpForm(): void {
    this.form = this.fb.group<ISignupDataFormGroup>({
      login: this.fb.control<string>('', { nonNullable: true, validators: loginValidators }),
      email: this.fb.control<string>('', { nonNullable: true, validators: emailValidators }),
      password: this.fb.control<string>('', { nonNullable: true }),
      confirmPassword: this.fb.control<string>('', { nonNullable: true }),
      name: this.fb.control<string>('', { nonNullable: true }),
      description: this.fb.control<string | null>(''),
    });
    this.addPasswordsValidators();
  }

  goToDetailsStep(): void {
    this.form.markAllAsTouched();
    if (this.submitDisabled) {
      return;
    }
    this.form.markAsUntouched();
    this.addDetailsStepValidators();
    this.currentSignupStep = ESignupStep.details;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.submitDisabled) {
      return;
    }
    this.router.navigate(['signin']);
  }

  private addDetailsStepValidators(): void {
    const name = this.controls.name;
    name.setValidators(nameValidators);
    const description = this.controls.description;
    description.setValidators(descriptionValidators);
  }

  private addPasswordsValidators(): void {
    const password = this.controls.password;
    const confirmPassword = this.controls.confirmPassword;
    password.setValidators(getSignupPasswordValidators(confirmPassword));
    confirmPassword.setValidators(getSignupPasswordValidators(password));
  }

  private subscribeOnPasswordsChanges(): void {
    const password = this.controls.password;
    const confirmPassword = this.controls.confirmPassword;
    password.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      confirmPassword.updateValueAndValidity({ emitEvent: false });
    });
    confirmPassword.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      password.updateValueAndValidity({ emitEvent: false });
    });
  }
}
