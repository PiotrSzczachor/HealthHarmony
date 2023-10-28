import { createAction, props } from "@ngrx/store"
import { TokenResponse } from "src/app/models/auth/token-response.model"
import { UserLoginDto } from "src/app/models/auth/user-login-dto.model"
import { UserRegisterDto } from "src/app/models/auth/user-register-dto.model"
import { User } from "src/app/models/auth/user.model"

const prefix = '[Auth]'

export const login = createAction(
    `${prefix} Login`,
    props<{ loginDto: UserLoginDto }>()
)

export const loginSuccess = createAction(
    `${prefix} Login Success`,
    props<{ response: TokenResponse }>()
)

export const loginFailure = createAction(
    `${prefix} Login Failure`,
    props<{ error: string }>()
)

export const register = createAction(
    `${prefix} Register`,
    props<{ registerDto: UserRegisterDto }>()
)

export const registerSuccess = createAction(
    `${prefix} Register Success`,
    props<{ response: TokenResponse }>()
)

export const registerFailure = createAction(
    `${prefix} Register Failure`,
    props<{ error: string }>()
)

export const getUser = createAction(
    `${prefix} Get User`,
    props<{ id: string }>()
)

export const getUserSuccess = createAction(
    `${prefix} Get User Success`,
    props<{ user: User }>()
)

export const getUserFailure = createAction(
    `${prefix} Get User Failure`,
    props<{ error: string }>()
)
