import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, catchError, of, map } from 'rxjs';
import { modelUser } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { modelRole } from '../models/role';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = `${environment.backendOrigin}/user`;
  baseAuthURL: string = `${environment.backendOrigin}/auth`;

  private dataSubject = new BehaviorSubject<modelUser[]>([]);
  private _userList$: Observable<modelUser[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  set userList(value: modelUser[]) {
    this.dataSubject.next(value);
  }
  get userList(): Observable<modelUser[]> {
    return this._userList$;
  }

  getAll(): Observable<modelUser[] | null> {
    return this.http.get<modelUser[]>(`${this.baseURL}`).pipe(
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }

  create(
    fio: string,
    email: string,
    password: string
  ): Observable<modelUser | null> {
    return this.http
      .post<{ token: string }>(`${this.baseAuthURL}/registration`, {
        fio,
        email,
        password,
      })
      .pipe(
        map((response: { token: string }) =>
          this.authService.parseJWT(response.token)
        ),
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      );
  }

  update(
    id: number,
    email: string,
    fio: string,
    password: string
  ): Observable<modelUser | null> {
    return this.http
      .put<modelUser>(`${this.baseURL}/${id}`, { email, password, fio })
      .pipe(
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      );
  }
  delete(id: number): Observable<modelUser | null> {
    if (id === this.authService.user?.id) {
      alert('Данного пользователя удалить невозможно');
      return of(null);
    }
    return this.http.delete<modelUser>(`${this.baseURL}/${id}`).pipe(
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }
  addRole(name: string, userId: number): Observable<modelRole | null> {
    return this.http.put<modelRole>(`${this.baseURL}/role`, { name, userId }).pipe(
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }
}
