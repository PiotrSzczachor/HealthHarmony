import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";

export const selectFeature = (state: AppState) => state.clinicsState;

export const getClinicByIdSelector = createSelector(
    selectFeature,
    (state) => state.clinic
);

export const getClinicByIdWithoutImagesSelector = createSelector(
    selectFeature,
    (state) => state.clinicWithoutImages
);

export const getClinicsSelector = createSelector(
    selectFeature,
    (state) => state.clinics
);

export const getClinicsWithoutImagesSelector = createSelector(
    selectFeature,
    (state) => state?.clinicsWithoutImages
);

export const getPagedClinicsSelector = createSelector(
    selectFeature,
    (state) => state.pagedClinics
);

export const getClinicsFilters = createSelector(
    selectFeature,
    (state) => state.filters
);