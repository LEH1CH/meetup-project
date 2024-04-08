import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { modelMeetup } from '../models/meetup';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeetupService {
  baseURL: string = `${environment.backendOrigin}/meetup`;

  private dataSubject = new BehaviorSubject<modelMeetup[]>([]);
  private _meetupList$: Observable<modelMeetup[]> = this.dataSubject.asObservable();
  public currentPage = 1;

  constructor(private http: HttpClient) {}

  get meetupList(): Observable<modelMeetup[]> {
    return this._meetupList$;
  }
  set createMeetup(value: modelMeetup) {
    this.dataSubject.next([...this.dataSubject.value, value]);
  }
  set updateMeetup(value: modelMeetup) {
    this.dataSubject.next([
      ...this.dataSubject.value.map((meetup) =>
        meetup.id === value.id ? value : meetup
      ),
    ]);
  }
  set removeMeetup(value: modelMeetup) {
    this.dataSubject.next([
      ...this.dataSubject.value.filter((meetup) => meetup.id !== value.id),
    ]);
  }
  set meetupList(value: modelMeetup[]) {
    this.dataSubject.next(value);
  }

  getAll(): Observable<modelMeetup[] | null> {
    return this.http.get<modelMeetup[]>(`${this.baseURL}`).pipe(
      map((data) => {
        return data.sort((a: modelMeetup, b: modelMeetup) =>
          new Date(b.time) > new Date(a.time) ? 1 : -1
        );
      }),
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }

  subscribe(idMeetup: number, idUser: number): Observable<modelMeetup | null> {
    return this.http.put<modelMeetup>(`${this.baseURL}`, { idMeetup, idUser }).pipe(
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }

  unsubscribe(idMeetup: number, idUser: number): Observable<modelMeetup | null> {
    return this.http
      .delete<modelMeetup>(`${this.baseURL}`, { body: { idMeetup, idUser } })
      .pipe(
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      );
  }
  create(form: modelMeetup): Observable<modelMeetup | null> {
    return this.http
      .post<modelMeetup>(`${this.baseURL}`, {
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
  edit(form: modelMeetup, meetup: modelMeetup): Observable<modelMeetup | null> {
    return this.http
      .put<modelMeetup>(`${this.baseURL}/${meetup?.id}`, {
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
  delete(id: number): Observable<modelMeetup | null> {
    return this.http.delete<modelMeetup>(`${this.baseURL}/${id}`).pipe(
      catchError((err): Observable<null> => {
        alert(err.error.message);
        return of(null);
      })
    );
  }
}
