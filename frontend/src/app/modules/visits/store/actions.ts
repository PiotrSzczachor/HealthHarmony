import { createAction, props } from "@ngrx/store";
import { Doctor } from "src/app/models/doctors/doctor.model";
import { VisitsPerDay } from "src/app/models/visits/visits-per-day.model";
import { VisitsPerDayRequest } from "src/app/models/visits/visits-per-day-request.model";
import { WeeklyWorkSchedule } from "src/app/models/visits/weekly-work-schedule.model";

const prefix = '[Visits]'

export const getNumberOfAvaliableVisitsPerDay = createAction(
    `${prefix} Get Number Of Avaliable Visits Per Day`,
    props<{request: VisitsPerDayRequest}>()
);

export const getNumberOfAvaliableVisitsPerDaySuccess = createAction(
    `${prefix} Get Number Of Avaliable Visits Per Day Success`,
    props<{visitsPerDay: VisitsPerDay[]}>()
);

export const getNumberOfAvaliableVisitsPerDayFailure = createAction(
    `${prefix} Get Number Of Avaliable Visits Per Day Failure`,
    props<{error: string}>()
);

export const addDoctorSchedule = createAction(
    `${prefix} Add Doctor Schedule`,
    props<{request: WeeklyWorkSchedule}>()
);

export const addDoctorScheduleSuccess = createAction(
    `${prefix} Add Doctor Schedule Success`,
);

export const addDoctorScheduleFailure = createAction(
    `${prefix} Add Doctor Schedule Failure`,
    props<{error: string}>()
);