import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { BaseFormComponent } from 'src/app/modules/shared/directives/BaseFormComponent';
import { Router } from '@angular/router';
import { emailValidators, loginValidators, passwordValidators } from 'src/app/core/validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent extends BaseFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initSignInForm();
    this.subsctibeOnLoginChanges();
  }

  initSignInForm(): void {
    this.form = this.fb.group({
      login: this.fb.control('', loginValidators),
      password: this.fb.control('', passwordValidators),
    });
  }

  subsctibeOnLoginChanges(): void {
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
