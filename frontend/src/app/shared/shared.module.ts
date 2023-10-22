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
    TranslateModule
  ],
  exports: [
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    TranslateModule,
    DIRECTIVES,
    PIPES,
    COMPONENTS
  ]
})

export class SharedModule { }