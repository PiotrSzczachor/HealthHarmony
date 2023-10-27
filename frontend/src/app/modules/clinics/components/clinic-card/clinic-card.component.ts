import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Clinic } from 'src/app/models/clinics/clinic.model';
import { Image } from 'src/app/models/shared/image.model';
import { register } from 'swiper/element/bundle';
import { EditClinicComponent } from '../../containers/edit-clinic/edit-clinic.component';

@Component({
  selector: 'app-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.scss']
})
export class ClinicCardComponent implements OnInit {
    @Input() clinic!: Clinic;

    constructor(private sanitizer: DomSanitizer, private dialog: MatDialog) { }

    ngOnInit(): void {
        register();
    }

    openEditDialog(): void {
        this.dialog.open(EditClinicComponent, {data: {isEdit: true, id: this.clinic.id}})
    }

}
