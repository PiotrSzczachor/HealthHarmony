import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { AuthEffects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
    LoginComponent, RegisterComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('authState', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [COMPONENTS],
  providers: [AuthService]
})
export class AuthModule { }
