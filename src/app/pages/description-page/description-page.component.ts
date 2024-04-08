import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-description-page',
  templateUrl: './description-page.component.html',
  styleUrl: './description-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionPageComponent {}
