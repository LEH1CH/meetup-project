import { Component, OnInit } from '@angular/core';
import { Meetup } from '../models/meetup.model';
import { MeetupService } from '../meetup.service';
import { MeetupListComponent } from '../meetup-list/meetup-list.component';

@Component({
  selector: 'app-meetup-add',
  templateUrl: './meetup-add.component.html',
  styleUrls: ['./meetup-add.component.scss']
})
export class MeetupAddComponent implements OnInit {

  newMeetup: Meetup = new Meetup('', '', new Date(), 0, '', '', '', '', '');
  createdMeetup: Meetup | null = null;

  constructor(private meetupService: MeetupService, private meetupListComponent: MeetupListComponent) { }

  ngOnInit(): void {
  }

  createMeetup(): void {
    this.createdMeetup = null; // Устанавливаем значение переменной в null перед вызовом метода
    const createdMeetup = this.meetupService.createMeetup(this.newMeetup); // Вызываем метод сервиса для создания митапа
    if (createdMeetup) {
      // Митап успешно создан
      console.log('Митап успешно создан:', createdMeetup);
      this.createdMeetup = createdMeetup;
      this.newMeetup = new Meetup('', '', new Date(), 0, '', '', '', '', ''); 
      this.meetupListComponent.refreshMeetups(); // Обновляем список митапов
    } else {
      // Возникла ошибка при создании митапа
      console.error('Ошибка при создании митапа');
    }
  }
  
}
