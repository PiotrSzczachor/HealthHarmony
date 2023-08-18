import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';

const COMPONENTS = [
    DashboardPageComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [COMPONENTS],
  providers: []
})
export class DashboardModule { }
