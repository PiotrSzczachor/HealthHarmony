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
        startDate: new Date(),
    },
    avaliableVisits: []
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
            startDate: action.startDate
        }
    })),
    on(VisitsActions.clearFilters, (state) => ({
        ...state,
        filters: {
            ...state.filters,
            startDate: new Date(),
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
)