import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { FaqPageComponent } from './containers/faq-page/faq-page.component';
import { AppModule } from 'src/app/app.module';
import { MainPageModule } from "../main-page/main-page.module";

@NgModule({
    declarations: [
        FaqPageComponent
    ],
    imports: [
        CommonModule,
        TranslateModule.forRoot(),
        MatIconModule,
        MainPageModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaqModule { }
