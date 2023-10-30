import { Component, Input } from '@angular/core';
import { Doctor } from 'src/app/models/doctors/doctor.model';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent {
    @Input() doctor!: Doctor;

    openEditDialog(): void {
        
    }
}
