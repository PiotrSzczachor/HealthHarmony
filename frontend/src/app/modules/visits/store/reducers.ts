import { createReducer, on } from "@ngrx/store";
import { VisitsActions, VisitsState } from ".";

export const initialState: VisitsState = {
    visitsPerDay: [],
    filters: {
        specializationId: null,
        clinicId: null,
        isRemote: false,
        pageIndex: 0,
        pageSize: 10,
        orderBy: null,
        orderDescending: false,
        addDays: 0,
    },
    avaliableVisits: [],
    takenVisitsCalendarEvents: [],
    doctorVisitsCalendarEvents: [],
    doctorSchedule: null
}

export const reducers = createReducer(
    initialState,
    on(VisitsActions.getNumberOfAvaliableVisitsPerDay, (state) => ({
        ...state,
        visitsPerDay: []
    })),
    on(VisitsActions.getNumberOfAvaliableVisitsPerDaySuccess, (state, action) => ({
        ...state,
        visitsPerDay: action.visitsPerDay
    })),
    on(VisitsActions.applyFilters, (state, action) => ({
        ...state,
        filters: {
            ...state.filters,
            specializationId: action.filters.specializationId,
            clinicId: action.filters.clinicId,
            orderBy: action.filters.orderBy,
            isRemote: action.filters.isRemote,
            pageIndex: 0
        }
    })),
    on(VisitsActions.applyDateFilters, (state, action) => ({
        ...state,
        filters: {
            ...state.filters,
            addDays: action.addDays
        }
    })),
    on(VisitsActions.clearFilters, (state) => ({
        ...state,
        filters: {
            ...state.filters,
            addDays: 0,
            specializationId: null,
            clinicId: null,
            isRemote: false,
            acceptsRemotely: null,
            orderBy: null
        }
    })),
    on(VisitsActions.applyPaginationFilters, (state, action) => ({
        ...state,
        filters: {
            ...state.filters,
            pageIndex: action.filter.pageIndex,
        }
    })),
    on(VisitsActions.getAvaliableVisitsForSpecificDate, (state) => ({
        ...state,
        avaliableVisits: []
    })),
    on(VisitsActions.getAvaliableVisitsForSpecificDateSuccess, (state, action) => ({
        ...state,
        avaliableVisits: action.visits
    })),
    on(VisitsActions.getPatienTakenVisits, (state) => ({
        ...state,
        takenVisitsCalendarEvents: []
    })),
    on(VisitsActions.getPatientTakenVisitsSuccess, (state, action) => ({
        ...state,
        takenVisitsCalendarEvents: action.visits
    })),
    on(VisitsActions.getTakenVisitsAssignedToDoctor, (state) => ({
        ...state,
        doctorVisitsCalendarEvents: []
    })),
    on(VisitsActions.getTakenVisitsAssignedToDoctorSuccess, (state, action) => ({
        ...state,
        doctorVisitsCalendarEvents: action.visits
    })),
    on(VisitsActions.getDoctorSchedule, (state) => ({
        ...state,
        doctorSchedule: null
    })),
    on(VisitsActions.getDoctorScheduleSuccess, (state, action) => ({
        ...state,
        doctorSchedule: action.doctorSchedule
    })),
)