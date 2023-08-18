import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AuthActions, getLoggedInSelector } from '../../store';
import { UserLoginDto } from 'src/app/models/auth/user-login-dto.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loggedIn$: Observable<boolean> | undefined;

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private router: Router, private http: HttpClient, private store: Store<AppState>) { }

    dispatchLogIn(loginDto: UserLoginDto): void {
        this.store.dispatch(AuthActions.login({loginDto}));
    }

    signUpButtonClick() {
        this.router.navigate(['register']);
    }

    onSubmit() {
        this.dispatchLogIn(this.loginForm.value as UserLoginDto);
    }
}
