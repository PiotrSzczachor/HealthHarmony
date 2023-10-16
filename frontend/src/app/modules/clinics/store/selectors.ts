import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";

export const selectFeature = (state: AppState) => state.clinicsState;

export const getClinicByIdSelector = createSelector(
    selectFeature,
    (state) => state.clinic
);

export const getClinicByIdWithAddressSelector = createSelector(
    selectFeature,
    (state) => state.clinicWithAddress
);

export const getClinicsSelector = createSelector(
    selectFeature,
    (state) => state.clinics
);

export const getClinicsWithAddressesSelector = createSelector(
    selectFeature,
    (state) => state?.clinicsWithAddresses
);