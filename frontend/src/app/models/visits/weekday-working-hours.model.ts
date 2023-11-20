import { WeekdaysEnum } from "src/app/enums/weekdays.enum";

export interface WeekdayWorkingHours {
    startHour: string,
    endHour: string,
    duration: string,
    remote: boolean,
    dayOff: boolean,
    clinicId: string,
    weekday: WeekdaysEnum
}