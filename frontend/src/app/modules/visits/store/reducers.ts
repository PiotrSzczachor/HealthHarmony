import { createReducer, on } from "@ngrx/store";
import { VisitsActions, VisitsState } from ".";

export const initialState: VisitsState = {
    visitsPerDay: []
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
)