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
        let confirmPass = group.get('repeatPassword')?.value
        return pass === confirmPass ? null : { notSame: true }
    }

    registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        pesel: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        birthDate: [null as unknown as Date, Validators.required], 
        password: ['', Validators.required],
        repeatPassword: ['', Validators.required],
    });

    LogInButtonClick(): void {
        this.router.navigate(['login']);
    }

    SignUpButtonClick(): void {
        console.log(this.registerForm)
        console.log(this.registerForm.valid)
        if (this.registerForm.valid) {
            const registerDto = this.registerForm.value as UserRegisterDto
            this.store.dispatch(AuthActions.register({ registerDto }));
        }
    }
}
