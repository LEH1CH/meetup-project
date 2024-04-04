import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../services/meetup.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { IMeetup } from '../../models/meetup.model';
import { ModalComponent } from '../../components/modal/modal.component';


@Component({
  selector: 'app-users',
  templateUrl: './my-meetups-page.component.html',
  styleUrls: ['./my-meetups-page.component.scss']
})
export class MyMeetupsPageComponent implements OnInit {

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