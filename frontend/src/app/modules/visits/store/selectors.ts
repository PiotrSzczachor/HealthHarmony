import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";

export const selectFeature = (state: AppState) => state.visitsState;

export const getNumberOfAvaliableVisitsPerDaySelector = createSelector(
    selectFeature,
    (state) => state.visitsPerDay
);
