import { createReducer, on } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { AuthActions } from ".";
import jwt_decode from "jwt-decode";
import { DecodedToken } from "src/app/models/auth/decoded-token.model";
import { environment } from "src/environments/environments";

export const initialState: AuthState = {
    loggedIn: false,
    token: undefined,
    userId: undefined
}

export const reducers = createReducer(
    initialState,
    on(AuthActions.login, (state) => ({
        ...state,
        token: undefined,
        loggedIn: false
    })),
    on(AuthActions.loginSuccess, (state, action) => {
        localStorage.setItem(environment.tokenKey, action.response.token);
        var decodedToken = jwt_decode(action.response.token) as DecodedToken;
        console.log(decodedToken);
        return {
            ...state,
            loggedIn: true,
            token: action.response.token,
            userId: decodedToken.userId
        }
    }),
    on(AuthActions.register, (state) => ({
        ...state,
        token: undefined,
        loggedIn: false
    })),
    on(AuthActions.registerSuccess, (state, action) => {
        localStorage.setItem(environment.tokenKey, action.response.token);
        var decodedToken = jwt_decode(action.response.token) as DecodedToken;
        return {
            ...state,
            loggedIn: true,
            token: action.response.token,
            userId: decodedToken.userId
        }
    })
)