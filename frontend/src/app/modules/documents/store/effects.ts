import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { mergeMap, map, catchError, of } from "rxjs";
import { DocumentsService } from "src/app/services/documents.service";
import { AppState } from "src/app/store/app.state";
import { DocumentsActions } from ".";

@Injectable()
export class DocumentsEffects {

    constructor(private actions$: Actions,
                private documentsService: DocumentsService, 
                private router: Router, 
                private store: Store<AppState>, 
                private toast: ToastrService) { };

    getPatientDocuments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DocumentsActions.getPatientDocuments),
            mergeMap(() => {
                return this.documentsService.getPatientDocuments().pipe(
                    map(documents => DocumentsActions.getPatientDocumentsSuccess({documents})),
                    catchError(error => {
                        return of(DocumentsActions.getPatientDocumentsFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    

}