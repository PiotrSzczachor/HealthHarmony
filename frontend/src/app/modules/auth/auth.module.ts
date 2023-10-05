import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { AuthEffects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { MainPageModule } from "../main-page/main-page.module";

const COMPONENTS = [
    LoginComponent, RegisterComponent
];

@NgModule({
    declarations: [COMPONENTS],
    exports: [COMPONENTS],
    providers: [AuthService],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StoreModule.forFeature('authState', reducers),
        EffectsModule.forFeature([AuthEffects]),
        MainPageModule
    ]
})
export class AuthModule { }
