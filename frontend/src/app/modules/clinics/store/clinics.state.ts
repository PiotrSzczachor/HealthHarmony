import { Clinic } from "src/app/models/clinics/clinic.model";

export interface ClinicsState {
    clinic: Clinic | undefined;
    clinics: Clinic[];
    clinicWithoutImages: Clinic | undefined
    clinicsWithoutImages: Clinic[]
}