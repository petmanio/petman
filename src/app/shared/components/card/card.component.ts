import { Component, Input, OnInit } from '@angular/core';

export interface Config {
  avatar?: string;
  title: string;
  subtitle: string;
  image?: string;
  content: string;
}

@Component({
  selector: 'app-shared-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() config: Config = <Config>{};
  constructor() { }

  ngOnInit(): void {
  }

}
