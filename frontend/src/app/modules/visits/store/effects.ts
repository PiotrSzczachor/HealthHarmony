import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { VisitsService } from "src/app/services/visits.service";
import { VisitsActions } from ".";
import { mergeMap, map, catchError, of } from "rxjs";

@Injectable()
export class VisitsEffects {

    constructor(private actions$: Actions,
                private visitsService: VisitsService, 
                private toast: ToastrService) { };

    getuNumberOfAvaliableVisitsPerDay$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisitsActions.getNumberOfAvaliableVisitsPerDay),
            mergeMap(action => {
                return this.visitsService.getNumberOfAvaliableVisitsPerDay(action.request).pipe(
                    map(visitsPerDay => VisitsActions.getNumberOfAvaliableVisitsPerDaySuccess({ visitsPerDay })),
                    catchError(error => {
                        return of(VisitsActions.getNumberOfAvaliableVisitsPerDayFailure({ error: error.message }))
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

}
