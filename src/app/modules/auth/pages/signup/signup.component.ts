import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { ESigninStep } from 'src/app/core/models';
import {
  descriptionValidators,
  emailValidators,
  getSignupPasswordValidators,
  loginValidators,
  nameValidators
} from 'src/app/core/validators';
import { BaseFormComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BaseFormComponent implements OnInit {
  ESigninStep = ESigninStep;
  currentSigninStep = ESigninStep.main;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initSignUpForm();
    this.subscribeOnPasswordsChanges();
  }

  initSignUpForm(): void {
    this.form = this.fb.group({
      login: this.fb.control('', loginValidators),
      email: this.fb.control('', emailValidators),
      password: this.fb.control(''),
      confirmPassword: this.fb.control(''),
      name: this.fb.control(''),
      description: this.fb.control(''),
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
    this.currentSigninStep = ESigninStep.details;
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
