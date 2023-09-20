import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const hasKey = inject(AuthService).authKey !== null;

  if (!hasKey) {
    inject(Router).navigate(['/config']);
    return false;
  }

  return true;
};
