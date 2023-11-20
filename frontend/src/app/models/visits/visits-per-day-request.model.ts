export interface VisitsPerDayRequest {
    addDays: number,
    specializationId: string,
    clinicId?: string | null,
    isRemote: boolean
}