import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsPageComponent } from './containers/doctors-page/doctors-page.component';
import { DoctorsFiltersComponent } from './components/doctors-filters/doctors-filters.component';
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { reducers, DoctorsEffects } from './store';
import { EditDoctorComponent } from './containers/edit-doctor/edit-doctor.component';
import { SchedulePageComponent } from './containers/schedule-page/schedule-page.component';



@NgModule({
  declarations: [
    DoctorsPageComponent,
    DoctorsFiltersComponent,
    DoctorCardComponent,
    EditDoctorComponent,
    SchedulePageComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('doctorsState', reducers),
    EffectsModule.forFeature([DoctorsEffects]),
    SharedModule
  ]
})
export class DoctorsModule { }
