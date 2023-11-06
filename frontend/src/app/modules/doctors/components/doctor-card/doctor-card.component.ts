import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Doctor } from 'src/app/models/doctors/doctor.model';
import { EditDoctorComponent } from '../../containers/edit-doctor/edit-doctor.component';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent {
    @Input() doctor!: Doctor;

    constructor(private dialog: MatDialog) { }

    openEditDialog(): void {
        this.dialog.open(EditDoctorComponent, {data: {isEdit: true, id: this.doctor.id}});
    }
}
