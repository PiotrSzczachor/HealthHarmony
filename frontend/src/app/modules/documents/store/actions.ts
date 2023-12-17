import { createAction, props } from "@ngrx/store";
import { Document } from "src/app/models/documents/document.model";

const prefix = '[Documents]'

export const addDocument = createAction(
    `${prefix} Add Document`,
);

export const addDocumentSuccess = createAction(
    `${prefix} Add Document Success`,
    props<{visitsPerDay: string}>()
);

export const addDocumentFailure = createAction(
    `${prefix} Add Document Failure`,
    props<{error: string}>()
);

export const getPatientDocuments = createAction(
    `${prefix} Get Patient Documents`,
);

export const getPatientDocumentsSuccess = createAction(
    `${prefix} Get Patient Documents Success`,
    props<{documents: Document[]}>()
);

export const getPatientDocumentsFailure = createAction(
    `${prefix} Get Patient Documents Failure`,
    props<{error: string}>()
);