import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMeetup } from '../../models/meetup';
import { FormGroup } from '@angular/forms';
import { MeetupService } from '../../services/meetup.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  constructor(
    private meetupService: MeetupService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { isCreate: boolean; meetup?: IMeetup }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAll() {
    this.meetupService.getAll().subscribe((data: IMeetup[] | null) => {
      if (!data) {
        return;
      }
      this.meetupService.meetupList = data;
    });
  }

  createEditMeetup(form: FormGroup) {
    if (this.data.isCreate) {
      this.meetupService
        .create(form.value)
        .subscribe((data: IMeetup | null) => {
          if (!data) {
            return;
          }
          this.meetupService.createMeetup = data;
          this.getAll();
          form.reset();
        });
    } else {
      this.meetupService
        .edit(form.value, this.data.meetup!)
        .subscribe((data: IMeetup | null) => {
          if (!data) {
            return;
          }
          this.meetupService.updateMeetup = data;
          this.getAll();
          form.reset();
        });
    }
    this.dialogRef.close();
  }
}
