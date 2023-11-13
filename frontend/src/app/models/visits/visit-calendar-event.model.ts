import { Visit } from "./visit.model";

export interface VisitCalendarEvent extends Visit {
    start: Date,
    end: Date,
    title: string
}