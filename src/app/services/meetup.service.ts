import { Injectable } from '@angular/core';

import { IMeetup } from '../models/meetup';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  baseURL: string = `${environment.backendOrigin}/meetup`;

  public meetupList!: IMeetup[];
  public userMeetupList!: IMeetup[];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAll(): Observable<IMeetup[] | null> {
    return this.http
      .get<IMeetup[]>(`${this.baseURL}`)
      .pipe(
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      );
  }

  subscribe(idMeetup: number, idUser: number): Observable<IMeetup | null> {
    return this.http
      .put<IMeetup>(`${this.baseURL}`, { idMeetup, idUser })
      .pipe(
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
  create(meetup: IMeetup): Observable<IMeetup | null> {
    return this.http
      .post<IMeetup>(`${this.baseURL}`, {
        name: meetup.name,
        description: meetup.description,
        time: meetup.time,
        duration: meetup.duration,
        location: meetup.location,
        target_audience: meetup.target_audience,
        need_to_know: meetup.need_to_know,
        will_happen: meetup.will_happen,
        reason_to_come: meetup.reason_to_come
      })
      .pipe(
        catchError((err): Observable<null> => {
          alert("Митап с таким названием уже существует");
          return of(null);
        })
      )
  }
  edit(meetup: IMeetup, id: number): Observable<IMeetup | null> {
    return this.http
      .put<IMeetup>(`${this.baseURL}/${id}`,
        {
          name: meetup.name,
          description: meetup.description,
          time: meetup.time,
          duration: meetup.duration,
          location: meetup.location,
          target_audience: meetup.target_audience,
          need_to_know: meetup.need_to_know,
          will_happen: meetup.will_happen,
          reason_to_come: meetup.reason_to_come
        })
      .pipe(
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      )
  }
  delete(id: number): Observable<IMeetup | null> {
    return this.http
      .delete<IMeetup>(`${this.baseURL}/${id}`)
      .pipe(
        catchError((err): Observable<null> => {
          alert(err.error.message);
          return of(null);
        })
      )
  }
}
