import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import moment from 'moment';
import 'moment/locale/ru';
import { IMeetup } from '../../../models/meetup';

@Component({
  selector: 'app-meetup-form',
  templateUrl: './meetup-form.component.html',
  styleUrl: './meetup-form.component.scss'
})
export class MeetupFormComponent implements OnInit {

  meetupForm!: FormGroup
  today = new Date();

  @Output() meetupEvent = new EventEmitter();
  @Input() meetup!: IMeetup | undefined;

  constructor(
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    let timeHoursMeetup = this.getTime();

    this.meetupForm = new FormGroup({
      name: new FormControl<string>(this.meetup?.name || '', [Validators.required, Validators.minLength(3)]),
      description: new FormControl<string>(this.meetup?.description || '', [Validators.required]),
      time: new FormControl<string>(this.meetup?.time || '', [Validators.required]),
      timeHours: new FormControl<string>(timeHoursMeetup || '', [Validators.required, Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')]),
      duration: new FormControl<number>(this.meetup?.duration || 30, [Validators.required, Validators.pattern('^[ 0-9]+$')]),
      location: new FormControl<string>(this.meetup?.location || '', [Validators.required]),
      target_audience: new FormControl<string>(this.meetup?.target_audience || '', [Validators.required]),
      need_to_know: new FormControl<string>(this.meetup?.need_to_know || '', [Validators.required]),
      will_happen: new FormControl<string>(this.meetup?.will_happen || '', [Validators.required]),
      reason_to_come: new FormControl<string>(this.meetup?.reason_to_come || '', [Validators.required]),
    });
  }


  onSubmit() {
    if (this.meetupForm.invalid) { return }

    const timeArr = this.meetupForm.value.timeHours.split(':');
    this.meetupForm.value.time = moment(this.meetupForm.value.time);
    this.meetupForm.value.time.hour(timeArr[0]).minute(timeArr[1]);

    this.meetupEvent.emit({ form: this.meetupForm, id: this.meetup?.id });
  }
  
  getTime(): string | null {
    if (!this.meetup) { return null}
    return moment(this.meetup?.time).format('HH:mm');
  }
}
