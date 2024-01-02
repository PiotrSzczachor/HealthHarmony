import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from './containers/contact-page/contact-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ContactModule { }
