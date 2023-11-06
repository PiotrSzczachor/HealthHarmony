import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitsPageComponent } from './containers/visits-page/visits-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisitsSchedulerComponent } from './components/visits-scheduler/visits-scheduler.component';
import { VisitsFiltersComponent } from './components/visits-filters/visits-filters.component';



@NgModule({
  declarations: [
    VisitsPageComponent,
    VisitsSchedulerComponent,
    VisitsFiltersComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class VisitsModule { }
