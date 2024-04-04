import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of, tap } from 'rxjs';
import { Meetup } from './models/meetup.model';

@Injectable({
  providedIn: 'root',
})
export class MeetupService {
  private meetupsUrl = 'assets/meetups.json';
  private meetupsLoaded: boolean = false;
  private meetups: Meetup[] = [];
  private meetupUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  getMeetups(): Observable<Meetup[]> {
    return this.http.get<Meetup[]>(this.meetupsUrl);
  }

  loadMeetupsFromJson(): Observable<Meetup[]> {
    if (!this.meetupsLoaded) {
      return this.http.get<Meetup[]>(this.meetupsUrl).pipe(
        tap((meetups) => {
          this.addMeetupsFromJson(meetups);
          this.meetupsLoaded = true;
        })
      );
    } else {
      return of(this.meetups);
    }
  }

  addMeetupsFromJson(meetups: Meetup[]): void {
    this.meetups = [];
    this.meetups.push(...meetups);
    this.meetupsLoaded = true;
  }

  addMeetup(meetup: Meetup): void {
    this.meetups.push(meetup);
    this.meetupUpdated.next();
  }

  createMeetup(newMeetup: Meetup): Meetup {
    this.meetups.push(newMeetup);
    this.meetupUpdated.next();
    return newMeetup;
  }

  getMeetupUpdatedListener(): Observable<void> {
    return this.meetupUpdated.asObservable();
  }
  
  updateMeetup(meetup: Meetup): void {
    const index = this.meetups.findIndex(m => m.name === meetup.name);
    if (index !== -1) {
        this.meetups[index] = meetup;
    }
  }
  
}
