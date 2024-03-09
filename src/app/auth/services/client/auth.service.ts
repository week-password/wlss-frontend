import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TSignupData } from '@auth/models/client';
import { SignupApiService } from '@auth/services/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private signupApiService: SignupApiService) { }

  signup(signupData: TSignupData): Observable<void> {
    const {
      account: { confirmPassword, ...account },
      profile,
    } = signupData;
    return this.signupApiService.signup({ account, profile });
  }
}
