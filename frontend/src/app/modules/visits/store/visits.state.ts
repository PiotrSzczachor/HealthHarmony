import { VisitCalendarEvent } from "src/app/models/visits/visit-calendar-event.model";
import { Visit } from "src/app/models/visits/visit.model";
import { VisitsFilters } from "src/app/models/visits/visits-filters.model";
import { VisitsPerDay } from "src/app/models/visits/visits-per-day.model";
import { WeeklyWorkSchedule } from "src/app/models/visits/weekly-work-schedule.model";

export interface VisitsState {
    visitsPerDay: VisitsPerDay[],
    avaliableVisits: Visit[],
    filters: VisitsFilters,
    takenVisitsCalendarEvents: VisitCalendarEvent[],
    doctorVisitsCalendarEvents: VisitCalendarEvent[],
    doctorSchedule: WeeklyWorkSchedule | undefined,
    visit: Visit | undefined
}