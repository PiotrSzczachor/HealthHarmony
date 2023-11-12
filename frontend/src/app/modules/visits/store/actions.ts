import { createAction, props } from "@ngrx/store";
import { Doctor } from "src/app/models/doctors/doctor.model";
import { VisitsPerDay } from "src/app/models/visits/visits-per-day.model";
import { VisitsPerDayRequest } from "src/app/models/visits/visits-per-day-request.model";
import { WeeklyWorkSchedule } from "src/app/models/visits/weekly-work-schedule.model";
import { PaginatorEvent } from "src/app/models/shared/paginator-event.model";
import { VisitsFilters } from "src/app/models/visits/visits-filters.model";
import { DateFilters } from "src/app/models/visits/date-filters.model";
import { Visit } from "src/app/models/visits/visit.model";

const prefix = '[Visits]'

export const getNumberOfAvaliableVisitsPerDay = createAction(
    `${prefix} Get Number Of Avaliable Visits Per Day`,
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

export const applyFilters = createAction(
    `${prefix} Apply Filters`,
    props<{filters: VisitsFilters}>()
);

export const applyDateFilters = createAction(
    `${prefix} Apply Date Filters`,
    props<{startDate: Date}>()
);

export const applyPaginationFilters = createAction(
    `${prefix} Apply Pagination Filters`,
    props<{filter: PaginatorEvent}>()
);

export const clearFilters = createAction(
    `${prefix} Clear Filters`,
);

export const getAvaliableVisitsForSpecificDate = createAction(
    `${prefix} Get Avaliable Visits For Specific Date`,
    props<{visitDate: Date}>()
);

export const getAvaliableVisitsForSpecificDateSuccess = createAction(
    `${prefix} Get Avaliable Visits For Specific Date Success`,
    props<{visits: Visit[]}>()
);

export const getAvaliableVisitsForSpecificDateFailure = createAction(
    `${prefix} Get Avaliable Visits For Specific Date Failure`,
    props<{error: string}>()
);

export const bookVisit = createAction(
    `${prefix} Book Visit`,
    props<{visitId: string}>()
);

export const bookVisitSuccess = createAction(
    `${prefix} Book Visit Success`,
    props<{visit: Visit}>()
);

export const bookVisitFailure = createAction(
    `${prefix} Book Visit Failure`,
    props<{error: string}>()
);