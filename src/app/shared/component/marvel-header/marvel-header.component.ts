import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tv-marvel-header',
  templateUrl: './marvel-header.component.html',
  styleUrls: ['./marvel-header.component.scss'],
})
export class MarvelHeaderComponent {
  @Input() headerTitle: string;
  @Input() hasGoBack: boolean;
  @Output() goBackButton = new EventEmitter<any>();

  constructor() {}

  goBack() {
    this.goBackButton.emit();
  }

}
