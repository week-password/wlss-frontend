import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { takeUntil } from 'rxjs';

import { WelcomeConversationComponent } from '@auth/components/welcome-conversation';
import { WelcomeFormBlockComponent } from '@auth/components/welcome-form-block';
import { TSigninData, TSigninDataFormGroup } from '@auth/models/client';
import { AuthService } from '@auth/services/client';
import {
  emailValidators,
  loginValidators,
  passwordValidators,
} from '@auth/validators';
import { BaseFormComponent } from '@core/base-components';
import { ButtonComponent } from '@core/components/button';
import { InputComponent } from '@core/components/input';
import { SnackbarComponent } from '@core/components/snackbar';
import { EHttpError } from '@core/models/api';
import {
  EMatSnackbarHPosition,
  EMatSnackbarVPosition,
  EPosition,
  ESnackbarView,
  ETextPosition,
  TSnackbarData,
} from '@core/models/client';

@Component({
  selector: 'app-signin-page',
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
export class SigninPage extends BaseFormComponent<TSigninDataFormGroup> implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initSignInForm();
    this.subscribeOnLoginChanges();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.submitDisabled) {
      return;
    }
    this.authService.signin(this.form.value as TSigninData).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: () => {
        this.router.navigate(['profile']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === EHttpError.notFound) {
          this.showInvalidCredentialsError();
          this.controls.password.setValue('');
        }
      },
    });
  }

  private initSignInForm(): void {
    this.form = this.fb.group<TSigninDataFormGroup>({
      login: this.fb.control<string>('', { nonNullable: true, validators: loginValidators }),
      password: this.fb.control<string>('', { nonNullable: true, validators: passwordValidators }),
    });
  }

  private subscribeOnLoginChanges(): void {
    const login = this.controls.login;
    login.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
      login.clearValidators();
      login.setValidators(value.includes('@') ? emailValidators : loginValidators);
      login.updateValueAndValidity({ emitEvent: false });
    });
  }

  private showInvalidCredentialsError(): void {
    const login = this.controls.login.value;
    const data: TSnackbarData = {
      text: `Неверный ${login.includes('@') ? 'e-mail' : 'логин'} или пароль`,
      catPosition: EPosition.top,
      textAlign: ETextPosition.left,
      view: ESnackbarView.error,
    };
    this.snackBar.openFromComponent(SnackbarComponent, {
      data,
      horizontalPosition: EMatSnackbarHPosition.end,
      verticalPosition: EMatSnackbarVPosition.top,
      duration: 5000,
    });
  }
}
