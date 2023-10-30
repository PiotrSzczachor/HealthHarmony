import { AuthState } from "../modules/auth/store";
import { ClinicsState } from "../modules/clinics/store";
import { DoctorsState } from "../modules/doctors/store";

export interface AppState {
    authState: AuthState,
    clinicsState: ClinicsState,
    doctorsState: DoctorsState
}