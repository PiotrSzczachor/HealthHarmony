import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";

export const selectFeature = (state: AppState) => state.authState;

export const getLoggedInSelector = createSelector(
    selectFeature,
    (state) => state.loggedIn
);