import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { AuthActions } from ".";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) { };

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(action => {
                return this.authService.login(action.loginDto).pipe(
                    map(response => AuthActions.loginSuccess({ response: response })),
                    catchError(error => {
                        return of(AuthActions.loginFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    onLoginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                AuthActions.loginSuccess,
                AuthActions.registerSuccess
            ),
            tap(() => this.router.navigateByUrl('dashboard'))
        ), { dispatch: false }
    )

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            mergeMap(action => {
                return this.authService.register(action.registerDto).pipe(
                    map(response => AuthActions.registerSuccess({ response: response })),
                    catchError(error => {
                        return of(AuthActions.registerFailure({ error: error.message }))
                    })
                )
            })
        )
    );
}