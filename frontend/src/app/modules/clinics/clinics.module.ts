import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicsPageComponent } from './containers/clinics-page/clinics-page.component';
import { StoreModule } from '@ngrx/store';
import { ClinicsEffects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ClinicCardComponent } from './components/clinic-card/clinic-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClinicFiltersComponent } from './components/clinic-filters/clinic-filters.component';

@NgModule({
  declarations: [
    ClinicsPageComponent,
    ClinicCardComponent,
    ClinicFiltersComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('clinicsState', reducers),
    EffectsModule.forFeature([ClinicsEffects]),
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicsModule { }
