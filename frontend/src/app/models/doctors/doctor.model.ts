import { Clinic } from "../clinics/clinic.model";
import { Image } from "../shared/image.model";
import { Specializations } from "./specialization.model";

export interface Doctor {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    acceptsRemotely: boolean,
    clinics: Clinic[],
    specializations: Specializations[],
    image?: Image
}