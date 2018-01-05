import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Config {
  avatar?: string;
  title: string;
  subtitle: string;
  image?: string;
  content?: string;
  price?: number;
  contentHTML?: string;
}

export interface ICardComponent {
  onShareLocal($event: Event): void;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, ICardComponent {
  @Input() config: Config = <Config>{};
  @Output() onShare = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onShareLocal($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.onShare.emit();
  }

}
