import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);
    const token = localStorage.getItem(environment.tokenKey);
    var hasRequiredRole = true;
    if(route.data?.['requiredRole']){
        hasRequiredRole = authService.checkIfUserHasRole(route.data?.['requiredRole'])
    }
    if(token && hasRequiredRole){
        return true
    } else {
        router.navigateByUrl('');
    }
    return false;
};
