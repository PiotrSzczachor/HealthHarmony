import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicsPageComponent } from './containers/clinics-page/clinics-page.component';
import { StoreModule } from '@ngrx/store';
import { ClinicsEffects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    ClinicsPageComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('clinicsState', reducers),
    EffectsModule.forFeature([ClinicsEffects]),
  ]
})
export class ClinicsModule { }
