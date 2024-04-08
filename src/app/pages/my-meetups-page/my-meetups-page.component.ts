import { AuthService } from './../../services/auth.service';
import { MeetupService } from './../../services/meetup.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IMeetup } from '../../models/meetup';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-meetups-page',
  templateUrl: './my-meetups-page.component.html',
  styleUrl: './my-meetups-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyMeetupsPageComponent implements OnInit {
  public meetupList$!: Observable<IMeetup[]>;

  constructor(
    public meetupService: MeetupService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.meetupList$ = this.meetupService.meetupList;
    this.meetupService.getAll().subscribe((data: IMeetup[] | null) => {
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
    this.meetupService.delete(id).subscribe((data: IMeetup | null) => {
      if (!data) {
        return;
      }
      this.meetupService.removeMeetup = data;
    });
  }
}
