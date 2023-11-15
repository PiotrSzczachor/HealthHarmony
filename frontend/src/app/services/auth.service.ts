import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLoginDto } from 'src/app/models/auth/user-login-dto.model';
import { UserRegisterDto } from 'src/app/models/auth/user-register-dto.model';
import { environment } from 'src/environments/environments';
import { User } from '../models/auth/user.model';
import jwt_decode from "jwt-decode";
import { DecodedToken } from '../models/auth/decoded-token.model';
import { Roles } from '../enums/roles.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    prefix: string = environment.apiUrl + 'auth/'

    constructor(private http: HttpClient, private router: Router) { }

    login(dto: UserLoginDto): Observable<any> {
        return this.http.post<any>(this.prefix + 'login', dto);
    }

    register(dto: UserRegisterDto): Observable<any> {

        return this.http.post<any>(this.prefix + 'register', dto);
    }

    getUser(id: string): Observable<User> {
        return this.http.get<any>(this.prefix + 'users/' + id);
    }

    logout(): void {
        localStorage.removeItem(environment.tokenKey);
        this.router.navigateByUrl('');
    }

    getUserIdFromToken(): string {
        const token = localStorage.getItem(environment.tokenKey);
        if (!token) {
            this.logout()
            return '';
        }
        const decodedToken = jwt_decode(token) as DecodedToken;
        return decodedToken.userId;
    }

    getUserRoles(): string[] {
        const token = localStorage.getItem(environment.tokenKey);
        if (!token) {
            this.logout()
            return [];
        }
        const decodedToken = jwt_decode(token) as DecodedToken;
        return decodedToken.roles;
    }

    checkIfUserHasRole(role: Roles): boolean {
        const roles = this.getUserRoles();
        console.log(roles)
        return roles.includes(role);
    }

}
