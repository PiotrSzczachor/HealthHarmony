import { WeekdayWorkingHours } from "./weekday-working-hours.model"

export interface WeeklyWorkSchedule {
    monday: WeekdayWorkingHours
    tuesday: WeekdayWorkingHours
    wednesday: WeekdayWorkingHours
    thursday: WeekdayWorkingHours
    friday: WeekdayWorkingHours
    saturday: WeekdayWorkingHours
    sunday: WeekdayWorkingHours
}