import { User } from "src/app/models/auth/user.model";

export interface AuthState {
    loggedIn: boolean;
    token: string | undefined;
    userId: string | undefined;
    user: User | undefined;
}