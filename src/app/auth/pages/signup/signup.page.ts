import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntil } from 'rxjs';

import { WelcomeConversationComponent } from '@auth/components/welcome-conversation';
import { WelcomeFormBlockComponent } from '@auth/components/welcome-form-block';
import { ESignupStep, ISignupData, ISignupDataFormGroup } from '@auth/models';
import { AuthService, SignupService } from '@auth/services/client';
import {
  emailValidators,
  getSignupPasswordValidators,
  loginValidators,
  unavailableEmailValidator,
  unavailableLoginValidator,
} from '@auth/validators';
import { BaseFormComponent } from '@core/base-components';
import { ButtonComponent } from '@core/components/button';
import { InputComponent } from '@core/components/input';
import { TextareaComponent } from '@core/components/textarea';
import { ConvertEmptyStringToNullDirective, DisableRepeatWhitespacesDirective, TrimStartWhitespacesDirective } from '@core/directives';
import { EBaseColor } from '@core/models';
import { descriptionValidators, nameValidators } from '@profile/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    ConvertEmptyStringToNullDirective,
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
  EBaseColor = EBaseColor;
  ESignupStep = ESignupStep;
  currentSignupStep = ESignupStep.account;

  constructor(
    private authService: AuthService,
    private router: Router,
    private signupService: SignupService,
  ) {
    super();
  }

  get goToProfileStepDisabled(): boolean {
    const controls = Object.values(this.controls.account.controls);
    return controls.some(
      (control: AbstractControl) => control.invalid && control.touched,
    );
  }

  ngOnInit(): void {
    this.initSignUpForm();
    this.subscribeOnPasswordsChanges();
  }

  initSignUpForm(): void {
    this.form = this.fb.group<ISignupDataFormGroup>({
      account: this.fb.group({
        login: this.fb.control<string>('', {
          nonNullable: true,
          validators: loginValidators,
          asyncValidators: [unavailableLoginValidator(this.signupService)],
        }),
        email: this.fb.control<string>('', {
          nonNullable: true,
          validators: emailValidators,
          asyncValidators: [unavailableEmailValidator(this.signupService)],
        }),
        password: this.fb.control<string>('', { nonNullable: true }),
        confirmPassword: this.fb.control<string>('', { nonNullable: true }),
      }),
      profile: this.fb.group({
        name: this.fb.control<string>('', { nonNullable: true, validators: nameValidators }),
        description: this.fb.control<string | null>(null, { validators: descriptionValidators }),
      }),
    });
    this.addPasswordsValidators();
  }

  goToProfileStep(): void {
    this.controls.account.markAllAsTouched();
    if (this.goToProfileStepDisabled) {
      return;
    }
    this.currentSignupStep = ESignupStep.profile;
  }

  goToAccountStep(): void {
    this.currentSignupStep = ESignupStep.account;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.submitDisabled) {
      return;
    }
    this.authService.signup(this.form.value as ISignupData).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.router.navigate(['signin']);
    });
  }

  private addPasswordsValidators(): void {
    const password = this.controls.account.controls.password;
    const confirmPassword = this.controls.account.controls.confirmPassword;
    password.setValidators(getSignupPasswordValidators(confirmPassword));
    confirmPassword.setValidators(getSignupPasswordValidators(password));
  }

  private subscribeOnPasswordsChanges(): void {
    const password = this.controls.account.controls.password;
    const confirmPassword = this.controls.account.controls.confirmPassword;
    password.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      confirmPassword.updateValueAndValidity({ emitEvent: false });
    });
    confirmPassword.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      password.updateValueAndValidity({ emitEvent: false });
    });
  }
}
