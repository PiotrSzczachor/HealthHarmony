import { createReducer, on } from "@ngrx/store";
import { ClinicsState } from "./clinics.state";
import { ClinicsActions } from ".";

export const initialState: ClinicsState = {
    clinic: undefined,
    clinics: [],
    clinicWithoutImages: undefined,
    clinicsWithoutImages: []
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
    on(ClinicsActions.getClinicByIdWithoutImages, (state) => ({
        ...state,
        clinicWithoutImages: undefined
    })),
    on(ClinicsActions.getClinicByIdWithoutImagesSuccess, (state, action) => ({
        ...state,
        clinicWithoutImages: action.clinic
    })),
    on(ClinicsActions.getClinics, (state) => ({
        ...state,
        clinics: []
    })),
    on(ClinicsActions.getClinicsSuccess, (state, action) => ({
        ...state,
        clinics: action.clinics
    })),
    on(ClinicsActions.getClinicsWithoutImages, (state) => ({
        ...state,
        clinicsWithoutImages: []
    })),
    on(ClinicsActions.getClinicsWithoutImagesSuccess, (state, action) => ({
        ...state,
        clinicsWithoutImages: action.clinics
    })),
)