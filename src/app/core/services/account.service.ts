import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IAccount } from '@core/models';

import { account } from './mocks/account';

@Injectable({ providedIn: 'root' })
export class AccountService {
  getAccount(): Observable<IAccount> {
    return of(account);
  }
}
