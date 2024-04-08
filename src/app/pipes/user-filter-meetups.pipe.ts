import { AuthService } from './../services/auth.service';
import { Pipe, PipeTransform } from '@angular/core';
import { IMeetup } from '../models/meetup';

@Pipe({
  name: 'userFilterMeetups',
})
export class UserFilterMeetupsPipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform(meetups: IMeetup[]): IMeetup[] | null {
    if (!this.authService.user || meetups.length === 0) {
      return null;
    }
    return meetups.filter(
      (meetup) => meetup.createdBy == this.authService.user?.id
    );
  }
}
