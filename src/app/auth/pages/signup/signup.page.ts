import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntil } from 'rxjs';

import { WelcomeConversationComponent } from '@auth/components/welcome-conversation';
import { WelcomeFormBlockComponent } from '@auth/components/welcome-form-block';
import { ESignupStep, ISignupDataFormGroup } from '@auth/models';
import { emailValidators, getSignupPasswordValidators, loginValidators } from '@auth/validators';
import { BaseFormComponent } from '@core/base-components';
import { ButtonComponent } from '@core/components/button';
import { InputComponent } from '@core/components/input';
import { TextareaComponent } from '@core/components/textarea';
import { DisableRepeatWhitespacesDirective, TrimStartWhitespacesDirective } from '@core/directives';
import { descriptionValidators, nameValidators } from '@profile/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    DisableRepeatWhitespacesDirective,
    FormsModule,
    InputComponent,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    TextareaComponent,
    TrimStartWhitespacesDirective,
    WelcomeConversationComponent,
    WelcomeFormBlockComponent,
  ],
})
export class SignupPage extends BaseFormComponent<ISignupDataFormGroup> implements OnInit {
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
