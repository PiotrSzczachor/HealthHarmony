import { Doctor } from "../doctors/doctor.model";
import { Patient } from "../patients/patient.model";

export interface Document {
    id?: string,
    name: string,
    content: any,
    extension: string,
    patientId: string,
    doctorId: string,
    patient: Patient,
    doctor: Doctor
}