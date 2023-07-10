import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupComponent } from '../components/signup/signup.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hasAccess() {
    throw new Error('Method not implemented.');
  }

  private baseUrl: string = "http://localhost:52927/api/User/";
  private tokenKey: string = "token";
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  signUp(user: any) {
    return this.http.post<any>(`${this.baseUrl}register`, user);
  }
  login(user: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, user);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem(this.tokenKey, tokenValue);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.tokenKey)
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(token);
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if (this.userPayload)
      return this.userPayload.unique_name;
  }

  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }
}
