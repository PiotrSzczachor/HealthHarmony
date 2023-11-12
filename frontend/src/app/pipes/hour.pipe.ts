import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hour'
})
export class HourPipe implements PipeTransform {

    transform(timeOnlyHour: string): string {
        const hourParts = timeOnlyHour.split(':');
        if (hourParts.length >= 2) {
            const formattedHour = hourParts.slice(0, 2).join(':');
            return formattedHour;
        } else {
            console.error('Invalid hour format:', timeOnlyHour);
            return timeOnlyHour;
        }
    }

}
