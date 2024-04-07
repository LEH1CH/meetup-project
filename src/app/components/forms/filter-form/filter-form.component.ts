import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/ru';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})

export class FilterFormComponent implements OnInit {

  filterForm: FormGroup;

  @Output() filterEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();

  constructor(
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) {
    this.filterForm = new FormGroup({
      search: new FormControl<string>(''),
      criterion: new FormControl<'name' | 'description' | 'location' | 'time' | 'owner'>('name', [Validators.required])
    });
  }
  ngOnInit(): void {
    this.filterForm.controls['search'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged())
      .subscribe((text) => {
        if (this.filterForm.invalid) { return }
        this.filterEvent.emit({ search: text, criterion: this.filterForm.value.criterion })
      });
  }

  getDateFormatString(): string {
    if (this._locale === 'ru_RU') {
      return 'ДД.ММ.ГГГГ';
    }
    return '';
  }
}
