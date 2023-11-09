import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitsPageComponent } from './containers/visits-page/visits-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisitsSchedulerComponent } from './components/visits-scheduler/visits-scheduler.component';
import { VisitsFiltersComponent } from './components/visits-filters/visits-filters.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers, VisitsEffects } from './store';



@NgModule({
  declarations: [
    VisitsPageComponent,
    VisitsSchedulerComponent,
    VisitsFiltersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('visitsState', reducers),
    EffectsModule.forFeature([VisitsEffects]),
  ]
})
export class VisitsModule { }
