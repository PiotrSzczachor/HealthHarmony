import { VisitStatusEnum } from "src/app/enums/visit-status.enum";
import { Clinic } from "../clinics/clinic.model";
import { Doctor } from "../doctors/doctor.model";
import { Patient } from "../patients/patient.model";

export interface Visit {
    id?: string,
    doctor: Doctor,
    doctorId: string,
    patient?: Patient,
    patientId?: string,
    clinic: Clinic,
    clinicId: string,
    visitStatusEnum: VisitStatusEnum,
    startHour: string,
    endHour: string,
    visitDate: Date,
    isRemote: boolean
}