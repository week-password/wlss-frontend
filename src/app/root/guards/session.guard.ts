import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SessionStateService } from '@auth/services/state';

export const sessionGuard: CanActivateFn = () => {
  const router = inject(Router);
  const sessionStateService = inject(SessionStateService);
  const { isLoggedIn } = sessionStateService;
  if (!isLoggedIn) {
    router.navigate(['signin']);
  }
  return isLoggedIn;
};
