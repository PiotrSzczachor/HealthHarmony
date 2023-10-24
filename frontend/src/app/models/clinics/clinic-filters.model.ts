import { BasePaginationFilters } from "../shared/base-pagination-filters.model";

export interface ClinicsFilters extends BasePaginationFilters {
    name: string | null
}