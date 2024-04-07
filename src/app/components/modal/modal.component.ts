import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMeetup } from '../../models/meetup';
import { FormGroup } from '@angular/forms';
import { MeetupService } from '../../services/meetup.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  constructor(
    private meetupService: MeetupService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isCreate: boolean, meetup?: IMeetup },
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createEditMeetup(value: {form: FormGroup, meetup: IMeetup}) {

    if (this.data.isCreate) {
      this.meetupService.create(value.form.value).subscribe((data: IMeetup | null) => {
        if (!data) { return }
        this.meetupService.createMeetup = data;
        value.form.reset();
      })
    } else {
      this.meetupService.edit(value.form.value, value.meetup).subscribe((data: IMeetup | null) => {
        if (!data) { return }
        this.meetupService.updateMeetup = data;
        value.form.reset();
      })
    }
    this.dialogRef.close();
  }
}