import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import {
  emailValidators,
  loginValidators,
  passwordValidators,
} from 'src/app/core/validators/account';
import { BaseFormComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent extends BaseFormComponent implements OnInit {
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
    this.form = this.fb.group({
      login: this.fb.control('', loginValidators),
      password: this.fb.control('', passwordValidators),
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
