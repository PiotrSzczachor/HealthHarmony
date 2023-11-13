import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";

export const selectFeature = (state: AppState) => state.visitsState;

export const getNumberOfAvaliableVisitsPerDaySelector = createSelector(
    selectFeature,
    (state) => state.visitsPerDay
);

export const getVisitsFiltersSelector = createSelector(
    selectFeature,
    (state) => state.filters
);

export const getAvaliableVisitsForSpecificDateSelector = createSelector(
    selectFeature,
    (state) => state.avaliableVisits
);

export const getPatientTakenVisitsSelector = createSelector(
    selectFeature,
    (state) => state.takenVisitsCalendarEvents
);
