import { Component } from '@angular/core';
import { IMeetup } from '../../models/meetup';
import { MeetupService } from '../../services/meetup.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrl: './meetups-page.component.scss',
})
export class MeetupsPageComponent {

  public meetupList$!: Observable<IMeetup[]>;
  public searchFilter!: string;
  public criterionFilter!: 'name' | 'description' | 'location' | 'time' | 'owner';

  constructor(
    public meetupService: MeetupService
  ) { }

  ngOnInit(): void {
    this.meetupList$ = this.meetupService.meetupList;
    this.meetupService.getAll().subscribe((data: IMeetup[] | null) => {
      if (!data) { return }
      this.meetupService.meetupList = data;
    })
  }
  subscribe(value: { idMeetup: number, idUser: number }) {
    this.meetupService.subscribe(value.idMeetup, value.idUser).subscribe((data: IMeetup | null) => {
      if (!data) { return }
      this.meetupService.updateMeetup = data;
    })
  }
  unsubscribe(value: { idMeetup: number, idUser: number }) {
    this.meetupService.unsubscribe(value.idMeetup, value.idUser).subscribe((data: IMeetup | null) => {
      if (!data) { return }
      this.meetupService.updateMeetup = data;
    })
  }
  filter(value: { search: string, criterion: 'name' | 'description' | 'location' | 'time' | 'owner' }) {
    this.searchFilter = value.search;
    this.criterionFilter = value.criterion;
  }
}