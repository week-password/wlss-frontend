import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import {
  emailValidators,
  loginValidators,
  passwordValidators,
} from '@core/validators/account';
import { ISigninDataFormGroup } from '@modules/auth/core/models';
import { BaseFormComponent } from '@shared/base-components';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent extends BaseFormComponent<ISigninDataFormGroup> implements OnInit {
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
