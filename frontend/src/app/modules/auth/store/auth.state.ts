export interface AuthState {
    loggedIn: boolean;
    token: string | undefined;
    userId: string | undefined;
}