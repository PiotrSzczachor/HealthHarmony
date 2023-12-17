import { Injectable, NgZone } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { VisitsService } from "src/app/services/visits.service";
import { VisitsActions, getVisitsFiltersSelector } from ".";
import { mergeMap, map, catchError, of, withLatestFrom, tap } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { VisitsPerDayRequest } from "src/app/models/visits/visits-per-day-request.model";
import { GetAvaliableVisitsForSpecificDayRequest } from "src/app/models/visits/get-avaliable-visits-for-specific-day-request.model";
import { Router } from "@angular/router";

@Injectable()
export class VisitsEffects {

    constructor(private actions$: Actions,
        private visitsService: VisitsService,
        private toast: ToastrService,
        private store: Store<AppState>,
        private router: Router,
        private ngZone: NgZone) { };

    getNumberOfAvaliableVisitsPerDay$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.getNumberOfAvaliableVisitsPerDay,
                VisitsActions.applyDateFilters,
                VisitsActions.applyFilters),
            withLatestFrom(this.store.pipe(select(getVisitsFiltersSelector))),
            mergeMap(([action, filters]) => {
                return this.visitsService.getNumberOfAvaliableVisitsPerDay(filters as unknown as VisitsPerDayRequest).pipe(
                    map(visitsPerDay => VisitsActions.getNumberOfAvaliableVisitsPerDaySuccess({ visitsPerDay })),
                    catchError(error => {
                        return of(VisitsActions.getNumberOfAvaliableVisitsPerDayFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    getAvaliableVisitsForSpecificDate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.getAvaliableVisitsForSpecificDate),
            withLatestFrom(this.store.pipe(select(getVisitsFiltersSelector))),
            mergeMap(([action, filters]) => {
                return this.visitsService.getAvaliableVisitsForSpecificDate(filters as unknown as GetAvaliableVisitsForSpecificDayRequest, action.visitDate).pipe(
                    map(visits => VisitsActions.getAvaliableVisitsForSpecificDateSuccess({ visits })),
                    catchError(error => {
                        return of(VisitsActions.getAvaliableVisitsForSpecificDateFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    bookVisit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.bookVisit),
            mergeMap(action => {
                return this.visitsService.bookVisit(action.request).pipe(
                    map(visit => VisitsActions.bookVisitSuccess({ visit })),
                    catchError(error => {
                        return of(VisitsActions.bookVisitFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    completeVisit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.completeVisit),
            mergeMap(action => {
                return this.visitsService.completeVisit(action.completeVisitRequest).pipe(
                    map(() => VisitsActions.completeVisitSuccess()),
                    catchError(error => {
                        return of(VisitsActions.completeVisitFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    getPatientTakenVisits$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.getPatienTakenVisits),
            mergeMap(() => {
                return this.visitsService.getPatientTakenVisits().pipe(
                    map(visits => VisitsActions.getPatientTakenVisitsSuccess({ visits })),
                    catchError(error => {
                        return of(VisitsActions.getPatientTakenVisitsFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    getTakenVisitsAssignedToDoctor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.getTakenVisitsAssignedToDoctor),
            mergeMap(() => {
                return this.visitsService.getTakenVisitsAssignedToDoctor().pipe(
                    map(visits => VisitsActions.getTakenVisitsAssignedToDoctorSuccess({ visits })),
                    catchError(error => {
                        return of(VisitsActions.getTakenVisitsAssignedToDoctorFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    getVisitById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.getVisitById),
            mergeMap((action) => {
                return this.visitsService.getVisitById(action.id).pipe(
                    map(visit => VisitsActions.getVisitByIdSuccess({ visit })),
                    catchError(error => {
                        return of(VisitsActions.getVisitByIdFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    addDoctorSchedule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.addDoctorSchedule),
            mergeMap(action => {
                return this.visitsService.addDoctorSchedule(action.request).pipe(
                    map(() => VisitsActions.addDoctorScheduleSuccess()),
                    catchError(error => {
                        return of(VisitsActions.addDoctorScheduleFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    getDoctorSchedule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.getDoctorSchedule),
            mergeMap(() => {
                return this.visitsService.getDoctorSchedule().pipe(
                    map(doctorSchedule => VisitsActions.getDoctorScheduleSuccess({ doctorSchedule })),
                    catchError(error => {
                        return of(VisitsActions.getDoctorScheduleFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    updateDoctorSchedule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.updateDoctorSchedule),
            mergeMap(action => {
                return this.visitsService.updateDoctorSchedule(action.request).pipe(
                    map(() => VisitsActions.updateDoctorScheduleSuccess()),
                    catchError(error => {
                        return of(VisitsActions.updateDoctorScheduleFailure({ error: error.message }))
                    })
                )
            })
        )
    );

    bookVisitSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.bookVisitSuccess),
            tap((response) => {
                this.store.dispatch(VisitsActions.getAvaliableVisitsForSpecificDate({ visitDate: response.visit.visitDate }));
                this.store.dispatch(VisitsActions.getNumberOfAvaliableVisitsPerDay());
            })
        ), { dispatch: false }
    )

    onSaveScheduleSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.addDoctorScheduleSuccess,
                VisitsActions.updateDoctorScheduleSuccess),
            tap(() =>
                this.toast.success("Schedule saved successfully")
            )
        ), { dispatch: false }
    )

    onCompleteVisitSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.completeVisitSuccess),
            tap(() => {
                    this.toast.success("Visit completed successfully");
                    this.ngZone.run(() => {
                        this.router.navigateByUrl('dashboard/doctors-visits')
                    })
                }
            )
        ), { dispatch: false }
)

}
