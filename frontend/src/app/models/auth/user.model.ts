import { Image } from "../shared/image.model";

export interface User {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    image?: Image
}