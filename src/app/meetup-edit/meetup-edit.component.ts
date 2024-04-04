import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Meetup } from '../models/meetup.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meetup-edit',
  templateUrl: './meetup-edit.component.html',
  styleUrls: ['./meetup-edit.component.scss']
})
export class MeetupEditComponent {
  @Input() meetup!: Meetup;
  @Output() meetupUpdated: EventEmitter<Meetup> = new EventEmitter<Meetup>();
  

  constructor(
    public dialogRef: MatDialogRef<MeetupEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  onSaveChanges(): void {
    // Передаем измененный митап обратно в родительский компонент
    this.meetupUpdated.emit(this.meetup);
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}