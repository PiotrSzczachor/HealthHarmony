import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";

export const selectFeature = (state: AppState) => state.doctorsState;

export const getDoctorByIdSelector = createSelector(
    selectFeature,
    (state) => state.doctor
);

export const getDoctorsSelector = createSelector(
    selectFeature,
    (state) => state.doctors
);

export const getPagedDoctorsSelector = createSelector(
    selectFeature,
    (state) => state.pagedDoctors
);

export const getDoctorsFiltersSelector = createSelector(
    selectFeature,
    (state) => state.filters
);