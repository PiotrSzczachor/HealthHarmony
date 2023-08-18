import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginDto } from 'src/app/models/auth/user-login-dto.model';
import { UserRegisterDto } from 'src/app/models/auth/user-register-dto.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(dto: UserLoginDto): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'auth/login', dto);
  }

  register(dto: UserRegisterDto): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'auth/register', dto);
  }
  
}
