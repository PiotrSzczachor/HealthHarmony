import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserRegisterDto } from 'src/app/models/auth/user-register-dto.model';
import { AppState } from 'src/app/store/app.state';
import { AuthActions } from '../../store';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>) { }

    checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get('password')?.value;
        let confirmPass = group.get('confirmPassword')?.value
        return pass === confirmPass ? null : { notSame: true }
    }

    registerForm = this.formBuilder.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        repeatPassword: new FormControl('', Validators.required),
    });

    LogInButtonClick(): void {
        this.router.navigate(['login']);
    }

    SignUpButtonClick(): void {
        if (this.registerForm.valid) {
            console.log("TEST")
            const registerDto = this.registerForm.value as UserRegisterDto
            console.log(registerDto)
            this.store.dispatch(AuthActions.register({ registerDto }));
        }
    }
}
