import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private router: Router, private http: HttpClient) { }


    ngOnInit(): void {
    }

    signUpButtonClick() {
        this.router.navigate(['register']);
    }

    onSubmit() {
        this.http.post('https://localhost:7206/api/auth/login', this.loginForm.value).subscribe(x => console.log(x));
    }
}
