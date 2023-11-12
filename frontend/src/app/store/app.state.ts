import { AuthState } from "../modules/auth/store";
import { ClinicsState } from "../modules/clinics/store";
import { DoctorsState } from "../modules/doctors/store";
import { VisitsState } from "../modules/visits/store";

export interface AppState {
    authState: AuthState,
    clinicsState: ClinicsState,
    doctorsState: DoctorsState,
    visitsState: VisitsState
}