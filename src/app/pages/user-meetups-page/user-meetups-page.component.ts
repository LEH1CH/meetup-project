import { AuthService } from './../../services/auth.service';
import { MeetupService } from './../../services/meetup.service';
import { Component, OnInit } from '@angular/core';
import { IMeetup } from '../../models/meetup';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-user-meetups-page',
  templateUrl: './user-meetups-page.component.html',
  styleUrl: './user-meetups-page.component.scss'
})
export class UserMeetupsPageComponent implements OnInit {
  constructor(
    public meetupService: MeetupService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.meetupService.getAll().subscribe((data: IMeetup[] | null) => {
      if (!data) { return }

      this.meetupService.userMeetupList = data.filter(
        item => item.owner.id === this.authService.user?.id);
    })
  }
  delete(id: number) {
    this.meetupService.delete(id).subscribe((data: IMeetup | null) => {
      if (!data) { return }
      console.log(data)
    })
  }
  openDialog(): void {
    this.dialog.open(ModalComponent, {
      data: { isCreate: true },
      width: '800px'
    });
  }
}
