import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MainPageModule } from './modules/main-page/main-page.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AuthModule,
        DashboardModule,
        MainPageModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
    ],
    providers: [
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: TokenInterceptor, 
            multi: true 
        },
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: ErrorInterceptor, 
            multi: true 
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
