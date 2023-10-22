import { ClinicsFilters } from "src/app/models/clinics/clinic-filters.model";
import { Clinic } from "src/app/models/clinics/clinic.model";
import { PagedList } from "src/app/models/shared/paged-list.model";

export interface ClinicsState {
    clinic: Clinic | undefined;
    clinics: Clinic[];
    clinicWithoutImages: Clinic | undefined;
    clinicsWithoutImages: Clinic[];
    pagedClinics: PagedList<Clinic> | undefined;
    filters: ClinicsFilters
}