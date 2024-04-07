import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IMeetup } from '../models/meetup';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeetupService {
  baseURL: string = `${environment.backendOrigin}/meetup`;

  private dataSubject = new BehaviorSubject<IMeetup[]>([]);
  private _meetupList$: Observable<IMeetup[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  get meetupList(): Observable<IMeetup[]> {
    return this._meetupList$;
  }
  set createMeetup(value: IMeetup) {
    this.dataSubject.next([...this.dataSubject.value, value]);
  }
  set updateMeetup(value: IMeetup) {
    this.dataSubject.next([
      ...this.dataSubject.value.map((meetup) =>
        meetup.id === value.id ? value : meetup
      ),
    ]);
  }
  set removeMeetup(value: IMeetup) {
    this.dataSubject.next([
      ...this.dataSubject.value.filter((meetup) => meetup.id !== value.id),
    ]);
  }
  set meetupList(value: IMeetup[]) {
    this.dataSubject.next(value);
  }

  // handleError(error: any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }

  getAll(): Observable<IMeetup[] | null> {
    return this.http.get<IMeetup[]>(`${this.baseURL}`).pipe(
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }

  subscribe(idMeetup: number, idUser: number): Observable<IMeetup | null> {
    return this.http.put<IMeetup>(`${this.baseURL}`, { idMeetup, idUser }).pipe(
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }

  unsubscribe(idMeetup: number, idUser: number): Observable<IMeetup | null> {
    return this.http
      .delete<IMeetup>(`${this.baseURL}`, { body: { idMeetup, idUser } })
      .pipe(
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      );
  }
  create(form: IMeetup): Observable<IMeetup | null> {
    return this.http
      .post<IMeetup>(`${this.baseURL}`, {
        name: form.name,
        description: form.description,
        time: form.time,
        duration: form.duration,
        location: form.location,
        target_audience: form.target_audience,
        need_to_know: form.need_to_know,
        will_happen: form.will_happen,
        reason_to_come: form.reason_to_come,
      })
      .pipe(
        map((item) => {
          item.users = [];
          return item;
        }),
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      );
  }
  edit(form: IMeetup, meetup: IMeetup): Observable<IMeetup | null> {
    return this.http
      .put<IMeetup>(`${this.baseURL}/${meetup?.id}`, {
        name: form.name,
        description: form.description,
        time: form.time,
        duration: form.duration,
        location: form.location,
        target_audience: form.target_audience,
        need_to_know: form.need_to_know,
        will_happen: form.will_happen,
        reason_to_come: form.reason_to_come,
      })
      .pipe(
        map((item) => {
          item.owner = meetup!.owner;
          return item;
        }),
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      );
  }
  delete(id: number): Observable<IMeetup | null> {
    return this.http.delete<IMeetup>(`${this.baseURL}/${id}`).pipe(
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }
}
