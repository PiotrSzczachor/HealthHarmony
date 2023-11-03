import { Clinic } from "../clinics/clinic.model";
import { Image } from "../shared/image.model";
import { Specialization } from "./specialization.model";

export interface Doctor {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    acceptsRemotely: boolean,
    clinicsIds: string[],
    clinics: Clinic[],
    specializations: Specialization[],
    image?: Image
}