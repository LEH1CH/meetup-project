import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Meetup } from '../models/meetup.model';

@Component({
  selector: 'app-meetup-edit',
  templateUrl: './meetup-edit.component.html',
  styleUrls: ['./meetup-edit.component.scss']
})
export class MeetupEditComponent {
meetup: any;
  constructor(
    public dialogRef: MatDialogRef<MeetupEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meetup
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
