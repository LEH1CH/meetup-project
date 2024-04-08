import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { modelMeetup } from '../../models/meetup';
import { MeetupService } from '../../services/meetup.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrl: './meetups-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetupsPageComponent implements OnInit, OnDestroy {
  public meetupList$!: Observable<modelMeetup[] | any>;
  private destroy: Subject<void> = new Subject();
  public searchFilter!: string;
  public criterionFilter!:
    | 'name'
    | 'description'
    | 'location'
    | 'time'
    | 'owner';

  constructor(
    public meetupService: MeetupService,
    public spinnerService: SpinnerService
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
        this.meetupService.meetupList = data;
      });
  }
  subscribe(value: { idMeetup: number; idUser: number }) {
    this.meetupService
      .subscribe(value.idMeetup, value.idUser)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: modelMeetup | null) => {
        if (!data) {
          return;
        }
        this.meetupService.updateMeetup = data;
      });
  }
  unsubscribe(value: { idMeetup: number; idUser: number }) {
    this.meetupService
      .unsubscribe(value.idMeetup, value.idUser)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: modelMeetup | null) => {
        if (!data) {
          return;
        }
        this.meetupService.updateMeetup = data;
      });
  }
  filter(value: {
    search: string;
    criterion: 'name' | 'description' | 'location' | 'time' | 'owner';
  }) {
    this.searchFilter = value.search;
    this.criterionFilter = value.criterion;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
