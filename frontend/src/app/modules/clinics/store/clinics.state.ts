import { Clinic } from "src/app/models/clinics/clinic.model";

export interface ClinicsState {
    clinic: Clinic | undefined;
    clinicWithAddress: Clinic | undefined
    clinics: Clinic[];
    clinicsWithAddresses: Clinic[]
}