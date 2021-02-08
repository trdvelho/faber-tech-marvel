import { Component, Input } from '@angular/core';

@Component({
  selector: 'tv-marvel-list',
  templateUrl: './marvel-list.component.html',
  styleUrls: ['./marvel-list.component.scss'],
})
export class MarvelListComponent {
  @Input() arrayOfItems: any;

  constructor() {

   }
}
