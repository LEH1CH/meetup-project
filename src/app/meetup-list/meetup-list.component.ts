import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Meetup } from '../models/meetup.model';
import { MeetupService } from '../meetup.service';
import { Subscription } from 'rxjs';
import { MeetupEditComponent } from '../meetup-edit/meetup-edit.component';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss']
})
export class MeetupListComponent implements OnInit {
  meetups: Meetup[] = [];
  private meetupUpdatedSub!: Subscription;
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;

  constructor(private meetupService: MeetupService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.loadMeetupList();
    // Подписываемся на событие обновления данных
    this.meetupUpdatedSub = this.meetupService.getMeetupUpdatedListener().subscribe(() => {
      this.loadMeetupList(); // При получении события обновляем список митапов
    });
  }

  ngOnDestroy(): void {
    this.meetupUpdatedSub.unsubscribe(); // Отписываемся от события при уничтожении компонента
  }

  loadMeetups(): void {
    this.loadMeetupList();
  }
// Метод для обновления списка митапов после создания нового митапа
refreshMeetups(): void {
  this.loadMeetups();
}

  loadMeetupList(): void {
    // Загружаем митапы из JSON файла и добавляем их в список митапов
    this.meetupService.loadMeetupsFromJson().subscribe(
      (meetupsFromJson: Meetup[]) => {
        this.meetups = meetupsFromJson;
      },
      error => {
        console.error('Error loading meetup list from JSON:', error);
      }
    );
  }

  // Метод для открытия модального окна редактирования митапа
  editMeetup(meetup: Meetup): void {
    const modalRef = this.modalService.open(MeetupEditComponent, this.modalContainer);
    modalRef.componentInstance.meetup = meetup;
    modalRef.componentInstance.saveChanges.subscribe((updatedMeetup: Meetup) => {
      // Обновляем митап в списке после сохранения изменений
      const index = this.meetups.findIndex(m => m.id === updatedMeetup.id);
      if (index !== -1) {
        this.meetups[index] = updatedMeetup;
      }
      modalRef.close(); // Закрываем модальное окно
    });
  }
  
}
