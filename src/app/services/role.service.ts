import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { modelRole } from '../models/role';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  baseURL: string = `${environment.backendOrigin}/role`;

  private dataSubject = new BehaviorSubject<modelRole[]>([]);
  private _roleList$: Observable<modelRole[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  set roleList(value: modelRole[]) {
    this.dataSubject.next(value);
  }
  get roleList(): Observable<modelRole[]> {
    return this._roleList$;
  }

  getAll(): Observable<modelRole[] | null> {
    return this.http.get<modelRole[]>(`${this.baseURL}`).pipe(
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }
}
