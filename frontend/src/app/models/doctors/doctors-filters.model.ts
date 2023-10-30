import { BasePaginationFilters } from "../shared/base-pagination-filters.model";

export interface DoctorsFilters extends BasePaginationFilters {
    firstName: string | null;
    lastName: string | null;
    acceptsRemotely: string | null;
}