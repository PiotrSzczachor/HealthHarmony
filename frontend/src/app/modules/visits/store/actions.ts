import { createAction, props } from "@ngrx/store";
import { VisitsPerDay } from "src/app/models/visits/visits-per-day.model";
import { WeeklyWorkSchedule } from "src/app/models/visits/weekly-work-schedule.model";
import { PaginatorEvent } from "src/app/models/shared/paginator-event.model";
import { VisitsFilters } from "src/app/models/visits/visits-filters.model";
import { Visit } from "src/app/models/visits/visit.model";
import { VisitCalendarEvent } from "src/app/models/visits/visit-calendar-event.model";
import { BookVisitRequest } from "src/app/models/visits/book-visit-request.model";

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

export const updateDoctorSchedule = createAction(
    `${prefix} Update Doctor Schedule`,
    props<{request: WeeklyWorkSchedule}>()
);

export const updateDoctorScheduleSuccess = createAction(
    `${prefix} Update Doctor Schedule Success`,
);

export const updateDoctorScheduleFailure = createAction(
    `${prefix} Update Doctor Schedule Failure`,
    props<{error: string}>()
);

export const getDoctorSchedule = createAction(
    `${prefix} Get Doctor Schedule`
);

export const getDoctorScheduleSuccess = createAction(
    `${prefix} Get Doctor Schedule Success`,
    props<{doctorSchedule: WeeklyWorkSchedule}>()
);

export const getDoctorScheduleFailure = createAction(
    `${prefix} Get Doctor Schedule Failure`,
    props<{error: string}>()
);

export const applyFilters = createAction(
    `${prefix} Apply Filters`,
    props<{filters: VisitsFilters}>()
);

export const applyDateFilters = createAction(
    `${prefix} Apply Date Filters`,
    props<{addDays: number}>()
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
    props<{request: BookVisitRequest}>()
);

export const bookVisitSuccess = createAction(
    `${prefix} Book Visit Success`,
    props<{visit: Visit}>()
);

export const bookVisitFailure = createAction(
    `${prefix} Book Visit Failure`,
    props<{error: string}>()
);

export const getPatienTakenVisits = createAction(
    `${prefix} Get Patient Taken Visits`
);

export const getPatientTakenVisitsSuccess = createAction(
    `${prefix} Get Patient Taken Visits Success`,
    props<{visits: VisitCalendarEvent[]}>()
);

export const getPatientTakenVisitsFailure = createAction(
    `${prefix} Get Patient Taken Visits Failure`,
    props<{error: string}>()
);

export const getTakenVisitsAssignedToDoctor = createAction(
    `${prefix} Get Taken Visits Assigned To Doctor`
);

export const getTakenVisitsAssignedToDoctorSuccess = createAction(
    `${prefix} Get Taken Visits Assigned To Doctor Success`,
    props<{visits: VisitCalendarEvent[]}>()
);

export const getTakenVisitsAssignedToDoctorFailure = createAction(
    `${prefix} Get Taken Visits Assigned To Doctor Failure`,
    props<{error: string}>()
);

export const getVisitById = createAction(
    `${prefix} Get Visit By Id`,
    props<{id: string}>()
);

export const getVisitByIdSuccess = createAction(
    `${prefix} Get Visit By Id Success`,
    props<{visit: Visit}>()
);

export const getVisitByIdFailure = createAction(
    `${prefix} Get Visit By Id Failure`,
    props<{error: string}>()
);