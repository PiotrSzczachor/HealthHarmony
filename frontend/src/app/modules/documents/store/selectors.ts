import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";

export const selectFeature = (state: AppState) => state.documentsState;

export const getPatientDocumentsSelector = createSelector(
    selectFeature,
    (state) => state.patientDocuments
);
