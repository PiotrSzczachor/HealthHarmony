import { Address } from "../addresses/address.model";
import { Image } from "../shared/image.model";

export interface Clinic {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: Address
    images: Image[]
}