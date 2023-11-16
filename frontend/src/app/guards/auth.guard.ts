import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const AuthGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);
    const toast: ToastrService = inject(ToastrService)
    const token = localStorage.getItem(environment.tokenKey);
    var hasRequiredRole = true;
    if(route.data?.['requiredRole']){
        hasRequiredRole = authService.checkIfUserHasRole(route.data?.['requiredRole'])
    }
    if(token){
        if(hasRequiredRole){
            return true
        } else {
            toast.error("You don't have '" + route.data?.['requiredRole'] + "' role to access this part of the system")
            return false;
        }
    } else {
        router.navigateByUrl('');
    }
    return false;
};
