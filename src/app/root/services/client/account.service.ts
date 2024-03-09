import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TAccount } from '@profile/models/client';
import { account } from '@root/services/mocks/account';

@Injectable({ providedIn: 'root' })
export class AccountService {
  getAccount(): Observable<TAccount> {
    return of(account);
  }
}
