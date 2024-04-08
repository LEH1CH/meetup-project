import { AuthService } from './../../services/auth.service';
import { MeetupService } from './../../services/meetup.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { modelMeetup } from '../../models/meetup';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-my-meetups-page',
  templateUrl: './my-meetups-page.component.html',
  styleUrl: './my-meetups-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyMeetupsPageComponent implements OnInit, OnDestroy {
  public meetupList$!: Observable<modelMeetup[]>;
  private destroy: Subject<void> = new Subject();

  constructor(
    public meetupService: MeetupService,
    public authService: AuthService,
    public dialog: MatDialog,
    public spinnerService: SpinnerService,
  ) {}

  ngOnInit(): void {
    this.meetupList$ = this.meetupService.meetupList;
    this.meetupService
      .getAll()
      .pipe(takeUntil(this.destroy))
      .subscribe((data: modelMeetup[] | null) => {
        if (!data) {
          return;
        }
        if (this.authService.user) {
          this.meetupService.meetupList = data;
        }
      });
  }

  openDialog(): void {
    this.dialog.open(ModalComponent, {
      data: { isCreate: true },
      width: '800px',
    });
  }

  delete(id: number) {
    this.meetupService
      .delete(id)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: modelMeetup | null) => {
        if (!data) {
          return;
        }
        this.meetupService.removeMeetup = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
