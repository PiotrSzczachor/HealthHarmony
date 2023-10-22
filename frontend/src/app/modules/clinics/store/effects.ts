import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { Router } from "@angular/router";
import { ClinicsService } from "src/app/services/clinics.service";
import { ClinicsActions, getClinicsFilters } from ".";
import { AppState } from "src/app/store/app.state";
import { Store, select } from "@ngrx/store";

@Injectable()
export class ClinicsEffects {

    constructor(private actions$: Actions, private clinicsService: ClinicsService, private router: Router, private store: Store<AppState>) { };

    getClinicById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClinicsActions.getClinicById),
            mergeMap(action => {
                return this.clinicsService.getClinicById(action.id).pipe(
                    map(clinic => ClinicsActions.getClinicByIdSuccess({ clinic })),
                    catchError(error => {
                        return of(ClinicsActions.getClinicByIdFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    getPagedClinics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClinicsActions.getPagedClinics,
                ClinicsActions.applyFilters,
                ClinicsActions.applyPaginationFilters,
                ClinicsActions.clearFilters),
            withLatestFrom(this.store.pipe(select(getClinicsFilters))),
            mergeMap(([action, filters]) => {
                return this.clinicsService.getPagedClinics(filters).pipe(
                    map(pagedClinics => ClinicsActions.getPagedClinicsSuccess({pagedClinics})),
                    catchError(error => {
                        return of(ClinicsActions.getPagedClinicsFailure({error: error.message}))
                    })
                )
            })
        )
    )

    getClinicByIdWithoutImages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClinicsActions.getClinicByIdWithoutImages),
            mergeMap(action => {
                return this.clinicsService.getClinicByIdWithoutImages(action.id).pipe(
                    map(clinic => ClinicsActions.getClinicByIdWithoutImagesSuccess({ clinic })),
                    catchError(error => {
                        return of(ClinicsActions.getClinicByIdWithoutImagesFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    getClinics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClinicsActions.getClinics),
            mergeMap(action => {
                return this.clinicsService.getAllClinics().pipe(
                    map(clinics => ClinicsActions.getClinicsSuccess({ clinics })),
                    catchError(error => {
                        return of(ClinicsActions.getClinicsFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    getClinicsWithoutImages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClinicsActions.getClinicsWithoutImages),
            mergeMap(action => {
                return this.clinicsService.getAllClinicsWithoutImages().pipe(
                    map(clinics => ClinicsActions.getClinicsWithoutImagesSuccess({ clinics })),
                    catchError(error => {
                        return of(ClinicsActions.getClinicsWithoutImagesFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    addClinic$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClinicsActions.addClinic),
            mergeMap(action => {
                return this.clinicsService.addClinic(action.clinic).pipe(
                    map(() => ClinicsActions.addClinicSuccess()),
                    catchError(error => {
                        return of(ClinicsActions.addClinicFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    updateClinic$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClinicsActions.updateClinic),
            mergeMap(action => {
                return this.clinicsService.updateClinic(action.clinic).pipe(
                    map(() => ClinicsActions.updateClinicSuccess()),
                    catchError(error => {
                        return of(ClinicsActions.updateClinicFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    deleteClinic$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClinicsActions.deleteClinic),
            mergeMap(action => {
                return this.clinicsService.deleteClinic(action.id).pipe(
                    map(() => ClinicsActions.deleteClinicSuccess()),
                    catchError(error => {
                        return of(ClinicsActions.deleteClinicFailure({ error: error.message }))
                    })
                )
            })
        )
    );

}