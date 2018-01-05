import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent {
  @Output() onShare = new EventEmitter<Event>();
  constructor() { }
}
