import { createReducer, on } from "@ngrx/store";
import { DocumentsState } from "./documents.state";
import { DocumentsActions } from ".";

export const initialState: DocumentsState = {
    patientDocuments: []
}

export const reducers = createReducer(
    initialState,
    on(DocumentsActions.getPatientDocuments, (state) => ({
        ...state,
        patientDocuments: []
    })),
    on(DocumentsActions.getPatientDocumentsSuccess, (state, action) => ({
        ...state,
        patientDocuments: action.documents
    })),
)