import { createReducer, on } from "@ngrx/store";
import { ClinicsState } from "./clinics.state";
import { ClinicsActions } from ".";

export const initialState: ClinicsState = {
    clinic: undefined,
    clinics: [],
    clinicWithAddress: undefined,
    clinicsWithAddresses: []
}

export const reducers = createReducer(
    initialState,
    on(ClinicsActions.getClinicById, (state) => ({
        ...state,
        clinic: undefined
    })),
    on(ClinicsActions.getClinicByIdSuccess, (state, action) => ({
        ...state,
        clinic: action.clinic
    })),
    on(ClinicsActions.getClinicByIdWithAddress, (state) => ({
        ...state,
        clinicWithAddress: undefined
    })),
    on(ClinicsActions.getClinicByIdWithAddressSuccess, (state, action) => ({
        ...state,
        clinicWithAddress: action.clinic
    })),
    on(ClinicsActions.getClinics, (state) => ({
        ...state,
        clinics: []
    })),
    on(ClinicsActions.getClinicsSuccess, (state, action) => ({
        ...state,
        clinics: action.clinics
    })),
    on(ClinicsActions.getClinicsWithAddresses, (state) => ({
        ...state,
        clinicsWithAddresses: []
    })),
    on(ClinicsActions.getClinicsWithAddressesSuccess, (state, action) => ({
        ...state,
        clinicsWithAddresses: action.clinics
    })),
)