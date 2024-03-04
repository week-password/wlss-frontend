import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntil } from 'rxjs';

import { WelcomeConversationComponent } from '@auth/components/welcome-conversation';
import { WelcomeFormBlockComponent } from '@auth/components/welcome-form-block';
import { ISigninDataFormGroup } from '@auth/models';
import {
  emailValidators,
  loginValidators,
  passwordValidators,
} from '@auth/validators';
import { BaseFormComponent } from '@core/base-components';
import { ButtonComponent } from '@core/components/button';
import { InputComponent } from '@core/components/input';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    InputComponent,
    ReactiveFormsModule,
    RouterLink,
    WelcomeConversationComponent,
    WelcomeFormBlockComponent,
  ],
})
export class SigninPage extends BaseFormComponent<ISigninDataFormGroup> implements OnInit {
  constructor(
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initSignInForm();
    this.subscribeOnLoginChanges();
  }

  initSignInForm(): void {
    this.form = this.fb.group<ISigninDataFormGroup>({
      login: this.fb.control<string>('', { nonNullable: true, validators: loginValidators }),
      password: this.fb.control<string>('', { nonNullable: true, validators: passwordValidators }),
    });
  }

  subscribeOnLoginChanges(): void {
    const login = this.controls.login;
    login.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
      login.clearValidators();
      login.setValidators(value.includes('@') ? emailValidators : loginValidators);
      login.updateValueAndValidity({ emitEvent: false });
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.submitDisabled) {
      return;
    }
    this.router.navigate(['profile']);
  }
}
