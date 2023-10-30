import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { mergeMap, map, catchError, of, withLatestFrom, tap } from "rxjs";
import { DoctorsService } from "src/app/services/doctors.service";
import { AppState } from "src/app/store/app.state";
import { DoctorsActions, getDoctorsFiltersSelector } from ".";

@Injectable()
export class DoctorsEffects {

    constructor(private actions$: Actions,
                private doctorsService: DoctorsService, 
                private router: Router, 
                private store: Store<AppState>, 
                private toast: ToastrService) { };

    getDoctorById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DoctorsActions.getDoctorById),
            mergeMap(action => {
                return this.doctorsService.getDoctorById(action.id).pipe(
                    map(doctor => DoctorsActions.getDoctorByIdSuccess({ doctor })),
                    catchError(error => {
                        return of(DoctorsActions.getDoctorByIdFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    getPagedDoctors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DoctorsActions.getPagedDoctors,
                DoctorsActions.applyFilters,
                DoctorsActions.applyPaginationFilters,
                DoctorsActions.clearFilters,
                DoctorsActions.addDoctorSuccess,
                DoctorsActions.updateDoctorSuccess,
                DoctorsActions.deleteDoctorSuccess),
            withLatestFrom(this.store.pipe(select(getDoctorsFiltersSelector))),
            mergeMap(([action, filters]) => {
                return this.doctorsService.getPagedDoctors(filters).pipe(
                    map(pagedDoctors => DoctorsActions.getPagedDoctorsSuccess({pagedDoctors})),
                    catchError(error => {
                        return of(DoctorsActions.getPagedDoctorsFailure({error: error.message}))
                    })
                )
            })
        )
    )

    getDoctors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DoctorsActions.getDoctors),
            mergeMap(action => {
                return this.doctorsService.getAllDoctors().pipe(
                    map(doctors => DoctorsActions.getDoctorsSuccess({ doctors })),
                    catchError(error => {
                        return of(DoctorsActions.getDoctorsFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    addDoctor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DoctorsActions.addDoctor),
            mergeMap(action => {
                return this.doctorsService.addDoctor(action.doctor).pipe(
                    map(() => DoctorsActions.addDoctorSuccess()),
                    catchError(error => {
                        return of(DoctorsActions.addDoctorFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    updateDoctor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DoctorsActions.updateDoctor),
            mergeMap(action => {
                return this.doctorsService.updateDoctor(action.doctor).pipe(
                    map(() => DoctorsActions.updateDoctorSuccess()),
                    catchError(error => {
                        return of(DoctorsActions.updateDoctorFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    deleteDoctor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DoctorsActions.deleteDoctor),
            mergeMap(action => {
                return this.doctorsService.deleteDoctor(action.id).pipe(
                    map(() => DoctorsActions.deleteDoctorSuccess()),
                    catchError(error => {
                        return of(DoctorsActions.deleteDoctorFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    onAddSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DoctorsActions.addDoctorSuccess),
            tap(() => 
                this.toast.success("Doctor added successfully")
            )
        ), {dispatch: false}
    )

    onEditSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DoctorsActions.updateDoctorSuccess),
            tap(() => 
                this.toast.success("Doctor updated successfully")
            )
        ), {dispatch: false}
    )

    onDeleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DoctorsActions.deleteDoctorSuccess),
            tap(() => 
                this.toast.success("Doctor deleted successfully")
            )
        ), {dispatch: false}
    )

}
