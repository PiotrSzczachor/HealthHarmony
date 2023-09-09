import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './containers/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const COMPONENTS = [
    MainPageComponent, HeaderComponent, FooterComponent
]

@NgModule({
  declarations: [
    COMPONENTS,
    MapComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot(),
    LeafletModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainPageModule { }
