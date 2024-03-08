import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ISignupData } from '@auth/models';
import { SignupApiService } from '@auth/services/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private signupApiService: SignupApiService) { }

  signup(signupData: ISignupData): Observable<void> {
    const {
      account: { confirmPassword, ...account },
      profile,
    } = signupData;
    return this.signupApiService.signup({ account, profile });
  }
}
