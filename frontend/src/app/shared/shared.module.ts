import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { TokenInterceptor } from '../interceptors/token.interceptor';
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

const DIRECTIVES = [
    IsLoggedInDirective, IsNotLoggedInDirective
]

const PIPES = [
    DecodePipe
]

const COMPONENTS = [
    PaginatorComponent
]

@NgModule({
  declarations: [DIRECTIVES, PIPES, COMPONENTS],
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
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
    DIRECTIVES,
    PIPES,
    COMPONENTS
  ]
})

export class SharedModule { }