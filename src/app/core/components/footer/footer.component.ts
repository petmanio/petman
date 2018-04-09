import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Language } from '@common/enums';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  @Input() currentLanguage: string;
  @Output() onLanguageChange = new EventEmitter<string>();

  Language = Language;

  constructor() { }

  ngOnInit() {
  }

}
