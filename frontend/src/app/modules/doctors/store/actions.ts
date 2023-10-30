import { createAction, props } from "@ngrx/store";
import { DoctorDto } from "src/app/models/doctors/doctor-dto.model";
import { Doctor } from "src/app/models/doctors/doctor.model";
import { DoctorsFilters } from "src/app/models/doctors/doctors-filters.model";
import { PagedList } from "src/app/models/shared/paged-list.model";
import { PaginatorEvent } from "src/app/models/shared/paginator-event.model";

const prefix = '[Doctors]'

export const getDoctorById = createAction(
    `${prefix} Get Doctor By Id`,
    props<{id: string}>()
);

export const getDoctorByIdSuccess = createAction(
    `${prefix} Get Doctor By Id Success`,
    props<{doctor: Doctor}>()
);

export const getDoctorByIdFailure = createAction(
    `${prefix} Get Doctor By Id Failure`,
    props<{error: string}>()
);

export const getPagedDoctors = createAction(
    `${prefix} Get Paged Doctors`,
);

export const getPagedDoctorsSuccess = createAction(
    `${prefix} Get Paged Doctors Success`,
    props<{pagedDoctors: PagedList<Doctor>}>()
);

export const getPagedDoctorsFailure = createAction(
    `${prefix} Get Paged Doctors Failure`,
    props<{error: string}>()
);

export const applyFilters = createAction(
    `${prefix} Apply Filters`,
    props<{filters: DoctorsFilters}>()
);

export const applyPaginationFilters = createAction(
    `${prefix} Apply Pagination Filters`,
    props<{filter: PaginatorEvent}>()
);

export const clearFilters = createAction(
    `${prefix} Clear Filters`,
);

export const getDoctors = createAction(
    `${prefix} Get Doctors`
);

export const getDoctorsSuccess = createAction(
    `${prefix} Get Doctors Success`,
    props<{doctors: Doctor[]}>()
);

export const getDoctorsFailure = createAction(
    `${prefix} Get Doctors Failure`,
    props<{error: string}>()
);

export const addDoctor = createAction(
    `${prefix} Add Doctor`,
    props<{doctor: DoctorDto}>()
);

export const addDoctorSuccess = createAction(
    `${prefix} Add Doctor Success`,
);

export const addDoctorFailure = createAction(
    `${prefix} Add Doctor Failure`,
    props<{error: string}>()
);

export const updateDoctor = createAction(
    `${prefix} Update Doctor`,
    props<{doctor: Doctor}>()
);

export const updateDoctorSuccess = createAction(
    `${prefix} Update Doctor Success`,
);

export const updateDoctorFailure = createAction(
    `${prefix} Update Doctor Failure`,
    props<{error: string}>()
);

export const deleteDoctor = createAction(
    `${prefix} Delete Doctor`,
    props<{id: string}>()
);

export const deleteDoctorSuccess = createAction(
    `${prefix} Delete Doctor Success`,
);

export const deleteDoctorFailure = createAction(
    `${prefix} Delete Doctor Failure`,
    props<{error: string}>()
);