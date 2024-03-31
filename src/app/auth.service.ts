// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.apiUrl;
  private tokenKey = 'auth_token';
  isLoggedInFlag!: boolean;

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string, fio: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credentials);
  }

  register(userInfo: { email: string, password: string, fio: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/registration`, userInfo);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user`);
  }

  // Метод для установки флага залогиненности пользователя
  setLoggedIn(value: boolean): void {
    this.isLoggedInFlag = value;
  }

  // Метод для проверки, залогинен ли пользователь
  isLoggedIn(): boolean {
    return this.isLoggedInFlag;
  }
}
