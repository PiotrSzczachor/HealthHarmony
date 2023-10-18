import { createAction, props } from "@ngrx/store"
import { Clinic } from "src/app/models/clinics/clinic.model";

const prefix = '[Clinics]'

export const getClinicById = createAction(
    `${prefix} Get Clinic By Id`,
    props<{id: string}>()
);

export const getClinicByIdSuccess = createAction(
    `${prefix} Get Clinic By Id Success`,
    props<{clinic: Clinic}>()
);

export const getClinicByIdFailure = createAction(
    `${prefix} Get Clinic By Id Failure`,
    props<{error: string}>()
);

export const getClinicByIdWithoutImages = createAction(
    `${prefix} Get Clinic By Id Without Images`,
    props<{id: string}>()
);

export const getClinicByIdWithoutImagesSuccess = createAction(
    `${prefix} Get Clinic By Id Without Images Success`,
    props<{clinic: Clinic}>()
);

export const getClinicByIdWithoutImagesFailure = createAction(
    `${prefix} Get Clinic By Id Without Images Failure`,
    props<{error: string}>()
);

export const getClinics = createAction(
    `${prefix} Get Clinics`
);

export const getClinicsSuccess = createAction(
    `${prefix} Get Clinics Success`,
    props<{clinics: Clinic[]}>()
);

export const getClinicsFailure = createAction(
    `${prefix} Get Clinics Failure`,
    props<{error: string}>()
);

export const getClinicsWithoutImages = createAction(
    `${prefix} Get Clinics Without Images`
);

export const getClinicsWithoutImagesSuccess = createAction(
    `${prefix} Get Clinics Without Images Success`,
    props<{clinics: Clinic[]}>()
);

export const getClinicsWithoutImagesFailure = createAction(
    `${prefix} Get Clinics Without Images Failure`,
    props<{error: string}>()
);

export const addClinic = createAction(
    `${prefix} Add Clinic`,
    props<{clinic: Clinic}>()
);

export const addClinicSuccess = createAction(
    `${prefix} Add Clinic Success`,
);

export const addClinicFailure = createAction(
    `${prefix} Add Clinic Failure`,
    props<{error: string}>()
);

export const updateClinic = createAction(
    `${prefix} Update Clinic`,
    props<{clinic: Clinic}>()
);

export const updateClinicSuccess = createAction(
    `${prefix} Update Clinic Success`,
);

export const updateClinicFailure = createAction(
    `${prefix} Update Clinic Failure`,
    props<{error: string}>()
);

export const deleteClinic = createAction(
    `${prefix} Delete Clinic`,
    props<{id: string}>()
);

export const deleteClinicSuccess = createAction(
    `${prefix} Delete Clinic Success`,
);

export const deleteClinicFailure = createAction(
    `${prefix} Delete Clinic Failure`,
    props<{error: string}>()
);