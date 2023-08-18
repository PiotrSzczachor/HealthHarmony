import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './containers/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';

const COMPONENTS = [
    MainPageComponent, HeaderComponent
]

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainPageModule { }
