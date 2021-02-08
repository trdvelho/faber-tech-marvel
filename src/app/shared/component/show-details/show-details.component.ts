import { Component, Input } from '@angular/core';

@Component({
  selector: 'tv-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent {
  @Input() item: any;

  constructor() { }

}
