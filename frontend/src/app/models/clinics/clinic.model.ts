import { Address } from "../addresses/address.model";

export interface Clinic {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: Address
}