import { BasePaginationFilters } from "../shared/base-pagination-filters.model";

export interface VisitsFilters extends BasePaginationFilters {
    specializationId: string | null,
    clinicId: string | null,
    startDate: Date,
    isRemote: boolean
}