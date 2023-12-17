import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsPageComponent } from './containers/documents-page/documents-page.component';
import { DocumentCardComponent } from './components/document-card/document-card.component';
import { DocumentsFiltersComponent } from './components/documents-filters/documents-filters.component';
import { SharedModule } from "../../shared/shared.module";
import { DocumentsEffects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
    declarations: [
        DocumentsPageComponent,
        DocumentCardComponent,
        DocumentsFiltersComponent,
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature('documentsState', reducers),
        EffectsModule.forFeature([DocumentsEffects]),
        SharedModule
    ]
})
export class DocumentsModule { }
