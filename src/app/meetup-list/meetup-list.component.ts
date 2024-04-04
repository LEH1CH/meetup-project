import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { Meetup } from '../models/meetup.model';
import { MeetupService } from '../meetup.service';
import { ModalService } from '../modal.service';
import { Subscription } from 'rxjs';
import { MeetupEditComponent } from '../meetup-edit/meetup-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss'],
})
export class MeetupListComponent implements OnInit, OnDestroy {
  meetups: Meetup[] = [];
  private meetupUpdatedSub!: Subscription;
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;


  constructor(
    private meetupService: MeetupService,
    private dialog: MatDialog // Используем MatDialog для управления модальными окнами
  ) {}

  ngOnInit(): void {
    this.loadMeetupList();
    this.meetupUpdatedSub = this.meetupService.getMeetupUpdatedListener().subscribe(() => {
      this.loadMeetupList();
    });
  }

  ngOnDestroy(): void {
    this.meetupUpdatedSub.unsubscribe();
  }

  loadMeetups(): void {
    this.loadMeetupList();
  }

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
    const dialogRef = this.dialog.open(MeetupEditComponent, {
      width: '400px', // Установите ширину модального окна по вашему усмотрению
      data: { meetup } // Передаем meetup в компонент MeetupEditComponent через data
    });
  
    dialogRef.afterClosed().subscribe((updatedMeetup: Meetup) => {
      if (updatedMeetup) {
        const index = this.meetups.findIndex(m => m.name === updatedMeetup.name);
        if (index !== -1) {
          this.meetups[index] = updatedMeetup;
        }
      }
    });
  }
  
}
