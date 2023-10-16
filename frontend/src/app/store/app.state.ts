import { AuthState } from "../modules/auth/store";
import { ClinicsState } from "../modules/clinics/store";

export interface AppState {
    authState: AuthState,
    clinicsState: ClinicsState
}