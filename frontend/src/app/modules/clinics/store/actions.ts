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

export const getClinicByIdWithAddress = createAction(
    `${prefix} Get Clinic By Id With Address`,
    props<{id: string}>()
);

export const getClinicByIdWithAddressSuccess = createAction(
    `${prefix} Get Clinic By Id With Address Success`,
    props<{clinic: Clinic}>()
);

export const getClinicByIdWithAddressFailure = createAction(
    `${prefix} Get Clinic By Id With Address Failure`,
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

export const getClinicsWithAddresses = createAction(
    `${prefix} Get Clinics With Addresses`
);

export const getClinicsWithAddressesSuccess = createAction(
    `${prefix} Get Clinics With Addresses Success`,
    props<{clinics: Clinic[]}>()
);

export const getClinicsWithAddressesFailure = createAction(
    `${prefix} Get Clinics With Addresses Failure`,
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