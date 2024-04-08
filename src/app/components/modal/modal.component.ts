import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMeetup } from '../../models/meetup';
import { FormGroup } from '@angular/forms';
import { MeetupService } from '../../services/meetup.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnDestroy {

  private destroy: Subject<void> = new Subject();

  constructor(
    private meetupService: MeetupService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isCreate: boolean, meetup?: IMeetup },
  ) { }

  getAll() {
    this.meetupService
      .getAll()
      .pipe(takeUntil(this.destroy))
      .subscribe((data: IMeetup[] | null) => {
        if (!data) { return }
        this.meetupService.meetupList = data;
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createEditMeetup(form: FormGroup) {
    this.data.isCreate ? this.createMeetup(form) : this.editMeettup(form);
    this.dialogRef.close();
  }
  createMeetup(form: FormGroup) {
    this.meetupService
      .create(form.value)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: IMeetup | null) => {
        if (!data) { return }
        this.meetupService.createMeetup = data;
        this.getAll();
        form.reset();
      })
  }
  editMeettup(form: FormGroup) {
    this.meetupService
      .edit(form.value, this.data.meetup!)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: IMeetup | null) => {
        if (!data) { return }
        this.meetupService.updateMeetup = data;
        this.getAll();
        form.reset();
      })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}