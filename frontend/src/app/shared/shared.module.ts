import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule } from '@ngx-translate/core';
import { IsLoggedInDirective } from '../directives/is-logged-in.directive';
import { IsNotLoggedInDirective } from '../directives/is-not-logged-in.directive';
import { DecodePipe } from '../pipes/decode.pipe';
import { PaginatorComponent } from './paginator/paginator.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HourPipe } from '../pipes/hour.pipe';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { ChangeLanguageComponent } from './change-language/change-language.component';

const DIRECTIVES = [
    IsLoggedInDirective, IsNotLoggedInDirective
]

const PIPES = [
    DecodePipe,
    HourPipe
]

const COMPONENTS = [
    PaginatorComponent, ConfirmationDialogComponent, PdfViewerComponent
]

@NgModule({
  declarations: [DIRECTIVES, PIPES, COMPONENTS, ChangeLanguageComponent],
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FullCalendarModule,
    NgxMaterialTimepickerModule,
    NgxExtendedPdfViewerModule
  ],
  exports: [
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FullCalendarModule,
    NgxMaterialTimepickerModule,
    NgxExtendedPdfViewerModule,
    DIRECTIVES,
    PIPES,
    COMPONENTS
  ]
})

export class SharedModule { }