import { User } from "../auth/user.model"
import { Visit } from "../visits/visit.model"

export interface Patient {
    id?: string,
    firstName: string
    lastName: string
    pesel: string
    birthDate: string
    phoneNumber: string
    email: string
    userId: string
    user: User
    visits: Visit[]
}