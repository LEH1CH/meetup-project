import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../models/user';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = `${environment.backendOrigin}/auth`;
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  public get token(): string | null {
    return localStorage.getItem('token');
  }

  public get user(): IUser | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return this.parseJWT(token);
  }

  public checkAdmin() {
    if (this.user?.roles) {
      this.isAdmin = this.user.roles.some((user) => user.name === 'ADMIN');
    } else {
      this.isAdmin = false;
    }
  }

  login(email: string, password: string): Observable<IUser | null> {
    return this.http
      .post<{ token: string }>(`${this.baseURL}/login`, { email, password })
      .pipe(
        tap((response: { token: string }) =>
          localStorage.setItem('token', response.token)
        ),
        map((response: { token: string }) => this.parseJWT(response.token)),
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      );
  }
  registration(
    fio: string,
    email: string,
    password: string
  ): Observable<IUser | null> {
    return this.http
      .post<{ token: string }>(`${this.baseURL}/registration`, {
        fio,
        email,
        password,
      })
      .pipe(
        tap((response: { token: string }) =>
          localStorage.setItem('token', response.token)
        ),
        map((response: { token: string }) => this.parseJWT(response.token)),
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  parseJWT(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
