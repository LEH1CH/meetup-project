// meetup-item.component.ts
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Meetup } from '../models/meetup.model';
import { MeetupEditComponent } from '../meetup-edit/meetup-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meetup-item',
  templateUrl: './meetup-item.component.html',
  styleUrls: ['./meetup-item.component.scss'],
})
export class MeetupItemComponent implements OnInit {
  @Input()
  meetup!: Meetup;
  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer!: ViewContainerRef;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  editMeetup(meetup: Meetup): void {
    const dialogRef = this.dialog.open(MeetupEditComponent, {
      width: '400px',
      data: meetup
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Обработка закрытия модального окна
    });
  }
}
