import { IMeetup } from './../../models/meetup';
import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'moment-timezone';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

moment.locale('ru');
// moment.tz.setDefault("Europe/Moscow");
moment.tz.setDefault();

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrl: './meetup.component.scss'
})
export class MeetupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.checkDateMeetup();

    if (this.meetup.owner.id === this.authService.user?.id) {
      this.isCanEdit = true;
    } else {
      this.isCanEdit = false;
    }
  }

  isOpen: boolean = false;
  isOldMeetup: boolean = false;
  isCanEdit: boolean = false;


  @Input() meetup!: IMeetup

  @Output() subscribeEvent = new EventEmitter();
  @Output() unsubscribeEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  get isSubscribe() {
    return this.meetup.users.find(item => item.id === this.authService.user?.id);
  }

  subscribe() {
    this.subscribeEvent.emit({
      idMeetup: this.meetup.id,
      idUser: this.authService.user?.id
    });
  }
  unsubscribe() {
    this.unsubscribeEvent.emit({
      idMeetup: this.meetup.id,
      idUser: this.authService.user?.id
    })
  }
  delete(): void {
    if (!confirm('Вы действительно хотите удалить митап?')) { return }
    this.deleteEvent.emit(this.meetup.id);
  }
  getDate(time: string) {
    return moment(time).format('DD.MM.YYYY, HH:mm');
  }
  checkDateMeetup(): void {
    const now = moment();
    const utcDate = moment.utc(this.meetup.time);
    if (utcDate.isAfter(now)) {
      this.isOldMeetup = false
    } else {
      this.isOldMeetup = true;
    }
  }
  openDialog(): void {
    this.dialog.open(ModalComponent, {
      data: { isCreate: false, meetup: this.meetup },
      width: '800px'
    });
  }
}
