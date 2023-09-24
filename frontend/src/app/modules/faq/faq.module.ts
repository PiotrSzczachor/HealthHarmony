import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { FaqPageComponent } from './containers/faq-page/faq-page.component';
import { MainPageModule } from "../main-page/main-page.module";
import { SharedModule } from 'src/app/shared/shared.module';

const COMPONENTS = [FaqPageComponent]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        TranslateModule.forRoot(),
        MainPageModule,
        SharedModule
    ],
    exports: [
        COMPONENTS
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaqModule { }
