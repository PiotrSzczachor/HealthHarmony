import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from 'src/environments/environments';

export const AuthGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const token = localStorage.getItem(environment.tokenKey);
    if(token){
        return true
    } else {
        router.navigateByUrl('');
    }
    return false;
};
