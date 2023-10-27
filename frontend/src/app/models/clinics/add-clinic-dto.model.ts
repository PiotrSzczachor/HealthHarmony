import { AddressDto } from "../addresses/address-dto.model";
import { Address } from "../addresses/address.model";
import { Image } from "../shared/image.model";

export interface AddClinicDto {
    name: string;
    email: string;
    phoneNumber: string;
    address: AddressDto
    images: Image[]
}