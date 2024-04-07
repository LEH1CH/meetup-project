import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { IUser } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { IRole } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = `${environment.backendOrigin}/user`;

  private dataSubject = new BehaviorSubject<IUser[]>([]);
  private _userList$: Observable<IUser[]> = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  set userList(value: IUser[]) {
    this.dataSubject.next(value);
  }
  get userList(): Observable<IUser[]> {
    return this._userList$;
  }

  getAll(): Observable<IUser[] | null> {
    return this.http
      .get<IUser[]>(`${this.baseURL}`)
      .pipe(catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      )
  }
  update(user: IUser): Observable<IUser | null> {
    console.log(user)
    return this.http
      .put<IUser>(`${this.baseURL}/${user.id}`,{
        emai: user.email,
        password: user.password,
        fio: user.fio
      })
      .pipe(catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      )
  }
  add(): Observable<IRole | null> {
    return this.http
      .put<IRole>(`${this.baseURL}/role`, { name: 'ADMIN', userId: 451 })
      .pipe(catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
      )
  }
  // add(name: string, userId: number): Observable<IRole | null> {
  //   return this.http
  //     .put<IRole>(`${this.baseURL}`, { name: 'ADMIN', userId: 451 })
  //     .pipe(catchError((err): Observable<null> => {
  //       alert(err.error.message);
  //       return of(null);
  //     })
  //     )
  // }

}