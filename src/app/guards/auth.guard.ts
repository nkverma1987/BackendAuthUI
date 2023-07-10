import { CanActivateFn, Router, } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';


// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


export function authGuard(): CanActivateFn {
  return () => {
    const auth: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const toast: NgToastService = inject(NgToastService);

    if (auth.isLoggedIn()) {
      return true;
    }

    toast.error({ detail: "ERROR", summary: "Please Login First!" });
    router.navigate(['login'])
    return false;
  };
}