import { createReducer, on } from "@ngrx/store";
import { DoctorsState } from "./doctors.state";
import { DoctorsActions } from ".";

export const initialState: DoctorsState = {
    doctor: undefined,
    doctors: [],
    pagedDoctors: undefined,
    filters: {
        pageIndex: 0,
        pageSize: 10,
        orderBy: null,
        orderDescending: false,
        firstName: null,
        lastName: null,
        acceptsRemotely: null
    }
}

export const reducers = createReducer(
    initialState,
    on(DoctorsActions.getDoctorById, (state) => ({
        ...state,
        doctor: undefined
    })),
    on(DoctorsActions.getDoctorByIdSuccess, (state, action) => ({
        ...state,
        doctor: action.doctor
    })),
    on(DoctorsActions.getDoctors, (state) => ({
        ...state,
        doctors: []
    })),
    on(DoctorsActions.getDoctorsSuccess, (state, action) => ({
        ...state,
        doctors: action.doctors
    })),
    on(DoctorsActions.applyFilters, (state, action) => ({
        ...state,
        filters: {
            ...state.filters,
            firstName: action.filters.firstName,
            lastName: action.filters.lastName,
            acceptsRemotely: action.filters.acceptsRemotely,
            orderBy: action.filters.orderBy,
            pageIndex: 0
        }
    })),
    on(DoctorsActions.clearFilters, (state) => ({
        ...state,
        filters: {
            ...state.filters,
            firstName: null,
            lastName: null,
            acceptsRemotely: null,
            orderBy: null
        }
    })),
    on(DoctorsActions.applyPaginationFilters, (state, action) => ({
        ...state,
        filters: {
            ...state.filters,
            pageIndex: action.filter.pageIndex,
        }
    })),
    on(DoctorsActions.getPagedDoctors, (state) => ({
        ...state
    })),
    on(DoctorsActions.getPagedDoctorsSuccess, (state, action) => ({
        ...state,
        pagedDoctors: action.pagedDoctors
    })),
)