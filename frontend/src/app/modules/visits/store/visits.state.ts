import { Visit } from "src/app/models/visits/visit.model";
import { VisitsFilters } from "src/app/models/visits/visits-filters.model";
import { VisitsPerDay } from "src/app/models/visits/visits-per-day.model";

export interface VisitsState {
    visitsPerDay: VisitsPerDay[],
    avaliableVisits: Visit[],
    filters: VisitsFilters
}