import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { TAccount } from '@profile/models/client';
import { TGetAccountsResponse } from '@root/models/api';
import { AccountApiService } from '@root/services/api';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private accountApiService: AccountApiService) {}

  getAccount(): Observable<TAccount | null> {
    const accountId = localStorage.getItem('account-id');
    if(!accountId) {
      return of(null);
    }
    const params = { id: [Number(accountId)], login: []};
    return this.accountApiService.getAccounts(params).pipe(
      switchMap((accounts: TGetAccountsResponse) => of(accounts[0])),
    );
  }
}
