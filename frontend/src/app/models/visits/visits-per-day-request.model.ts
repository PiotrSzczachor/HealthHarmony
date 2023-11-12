export interface VisitsPerDayRequest {
    startDate: Date,
    specializationId: string,
    clinicId?: string | null,
    isRemote: boolean
}