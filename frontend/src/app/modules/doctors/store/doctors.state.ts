import { Doctor } from "src/app/models/doctors/doctor.model";
import { DoctorsFilters } from "src/app/models/doctors/doctors-filters.model";
import { Specialization } from "src/app/models/doctors/specialization.model";
import { PagedList } from "src/app/models/shared/paged-list.model";

export interface DoctorsState {
    doctor: Doctor | undefined;
    doctors: Doctor[];
    pagedDoctors: PagedList<Doctor> | undefined;
    filters: DoctorsFilters
    specializations: Specialization[]
}