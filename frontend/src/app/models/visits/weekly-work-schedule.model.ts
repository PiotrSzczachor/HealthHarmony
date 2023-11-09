import { WeekdayWorkingHours } from "./weekday-working-hours.model"

export interface WeeklyWorkSchedule {
    Monday: WeekdayWorkingHours
    Tuesday: WeekdayWorkingHours
    Wednesday: WeekdayWorkingHours
    Thursday: WeekdayWorkingHours
    Friday: WeekdayWorkingHours
    Saturday: WeekdayWorkingHours
    Sunday: WeekdayWorkingHours
}