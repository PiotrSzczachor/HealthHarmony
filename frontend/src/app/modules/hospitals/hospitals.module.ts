import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalsPageComponent } from './containers/hospitals-page/hospitals-page.component';
import { HopsitalsPageComponent } from './containers/hopsitals-page/hopsitals-page.component';



@NgModule({
  declarations: [
    HospitalsPageComponent,
    HopsitalsPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HospitalsModule { }
