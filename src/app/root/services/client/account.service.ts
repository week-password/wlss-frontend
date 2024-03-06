import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IAccount } from '@profile/models';
import { account } from '@root/services/mocks/account';

@Injectable({ providedIn: 'root' })
export class AccountService {
  getAccount(): Observable<IAccount> {
    return of(account);
  }
}
