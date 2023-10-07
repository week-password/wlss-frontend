import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { IAccount } from 'src/app/core/models';
import { UserStateService } from 'src/app/core/state';

export const profileGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);
  return userStateService.account.pipe(map((account: IAccount | null) => {
    if (!account) {
      return false;
    }
    if (account.login === route.params.login) {
      router.navigate(['profile']);
    }
    return true;
  }));
};
