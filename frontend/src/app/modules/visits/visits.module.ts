import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitsPageComponent } from './containers/visits-page/visits-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisitsSchedulerComponent } from './components/visits-scheduler/visits-scheduler.component';
import { VisitsFiltersComponent } from './components/visits-filters/visits-filters.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers, VisitsEffects } from './store';
import { BookVisitPageComponent } from './containers/book-visit-page/book-visit-page.component';
import { BookVisitFiltersComponent } from './components/book-visit-filters/book-visit-filters.component';
import { VisitsCalendarComponent } from './components/visits-calendar/visits-calendar.component';
import { DoctorsVisitPageComponent } from './containers/doctors-visit-page/doctors-visit-page.component';

@NgModule({
  declarations: [
    VisitsPageComponent,
    VisitsSchedulerComponent,
    VisitsFiltersComponent,
    BookVisitPageComponent,
    BookVisitFiltersComponent,
    VisitsCalendarComponent,
    DoctorsVisitPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('visitsState', reducers),
    EffectsModule.forFeature([VisitsEffects]),
  ]
})
export class VisitsModule { }
