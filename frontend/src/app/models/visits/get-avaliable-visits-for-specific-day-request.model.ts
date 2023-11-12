export interface GetAvaliableVisitsForSpecificDayRequest {
    specializationId: string,
    clinicId?: string | null,
    isRemote: boolean
}