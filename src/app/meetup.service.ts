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
  private nextId: number = 1; // Начальное значение для генерации id
  
  constructor(private http: HttpClient) {}

  getMeetups(): Observable<Meetup[]> {
    return this.http.get<Meetup[]>(this.meetupsUrl);
  }

  loadMeetupsFromJson(): Observable<Meetup[]> {
    if (!this.meetupsLoaded) {
      // Проверяем, загружены ли митапы
      return this.http.get<Meetup[]>(this.meetupsUrl).pipe(
        tap((meetups) => {
          this.addMeetupsFromJson(meetups); // Добавляем митапы в список
          this.meetupsLoaded = true; // Устанавливаем флаг, что митапы уже загружены
        })
      );
    } else {
      return of(this.meetups); // Используем of для создания Observable
    }
  }

  // Метод для добавления митапов из JSON файла в список митапов
  addMeetupsFromJson(meetups: Meetup[]): void {
    // Очищаем текущий список митапов перед добавлением новых митапов из JSON файла
    this.meetups = [];
    // Добавляем митапы из JSON файла в список митапов
    this.meetups.push(...meetups);
    this.meetupsLoaded = true;
  }

  addMeetup(meetup: Meetup): void {
    this.meetups.push(meetup); // Добавляем митап в список
    this.meetupUpdated.next();
  }

  generateId(): number {
    return this.nextId++;
  }

  createMeetup(newMeetup: Meetup): Meetup {
    newMeetup.id = this.generateId();
    this.meetups.push(newMeetup); // Добавляем новый митап в список
    this.meetupUpdated.next();
    return newMeetup; // Возвращаем созданный митап
  }

  getMeetupUpdatedListener(): Observable<void> {
    return this.meetupUpdated.asObservable(); // Предоставляем доступ к Subject для подписки на обновления
  }
  
  updateMeetup(meetup: Meetup): void {
    const index = this.meetups.findIndex(m => m.id === meetup.id);
    if (index !== -1) {
        this.meetups[index] = meetup;
    }
}

}
