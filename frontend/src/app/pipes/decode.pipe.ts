import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../models/shared/image.model';

@Pipe({
    name: 'decode'
})
export class DecodePipe implements PipeTransform {

    transform(image: Image): any {
        return `data:image/${image.extension};base64,${image.content}`;;
    }

}
