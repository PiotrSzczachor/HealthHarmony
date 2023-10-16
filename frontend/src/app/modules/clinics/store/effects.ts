import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { ClinicsService } from "src/app/services/clinics.service";
import { ClinicsActions } from ".";

@Injectable()
export class ClinicsEffects {

    constructor(private actions$: Actions, private clinicsService: ClinicsService, private router: Router) { };

    getClinicById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClinicsActions.getClinicById),
            mergeMap( action => {
                return this.clinicsService.getClinicById(action.id).pipe(
                    map(clinic => ClinicsActions.getClinicByIdSuccess({clinic})),
                    catchError(error => {
                        return of(ClinicsActions.getClinicByIdFailure({ error: error.message }))
                    })
                )
            })
        )
    );

     getClinicByIdWithAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClinicsActions.getClinicByIdWithAddress),
            mergeMap( action => {
                return this.clinicsService.getClinicByIdWithAddress(action.id).pipe(
                    map(clinic => ClinicsActions.getClinicByIdWithAddressSuccess({clinic})),
                    catchError(error => {
                        return of(ClinicsActions.getClinicByIdWithAddressFailure({ error: error.message }))
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
                    map(clinics => ClinicsActions.getClinicsSuccess({clinics})),
                    catchError(error => {
                        return of(ClinicsActions.getClinicsFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    getClinicsWithAddresses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClinicsActions.getClinicsWithAddresses),
            mergeMap(action => {
                return this.clinicsService.getAllClinicsWithAddresses().pipe(
                    map(clinics => ClinicsActions.getClinicsWithAddressesSuccess({clinics})),
                    catchError(error => {
                        return of(ClinicsActions.getClinicsWithAddressesFailure({ error: error.message }))
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