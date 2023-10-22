import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Clinic } from 'src/app/models/clinics/clinic.model';
import { Image } from 'src/app/models/shared/image.model';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.scss']
})
export class ClinicCardComponent implements OnInit {
    @Input() clinic!: Clinic;

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        register();
    }

    decodeImage(image: Image): any {
        return `data:image/${image.extension};base64,${image.content}`;
    }
}
