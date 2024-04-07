import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { IUser } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { IRole } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = `${environment.backendOrigin}/user`;

  private dataSubject = new BehaviorSubject<IUser[]>([]);
  private _userList$: Observable<IUser[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  set userList(value: IUser[]) {
    this.dataSubject.next(value);
  }
  get userList(): Observable<IUser[]> {
    return this._userList$;
  }

  getAll(): Observable<IUser[] | null> {
    return this.http.get<IUser[]>(`${this.baseURL}`).pipe(
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
  ): Observable<IUser | null> {
    return this.http
      .put<IUser>(`${this.baseURL}/${id}`, { email, password, fio })
      .pipe(
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      );
  }
  delete(id: number): Observable<IUser | null> {
    return this.http.delete<IUser>(`${this.baseURL}/${id}`).pipe(
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }
  addRole(name: string, userId: number): Observable<IRole | null> {
    return this.http.put<IRole>(`${this.baseURL}/role`, { name, userId }).pipe(
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }
}
