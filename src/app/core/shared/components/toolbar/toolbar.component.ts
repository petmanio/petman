import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UserDto } from '../../../../../../common/models/user.model';
import { Language } from '../../../../../../common/enums';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() loggedIn: boolean;
  @Input() selectedUser: UserDto;
  @Input() currentLanguage: string;
  @Output() onLogOut = new EventEmitter<void>();
  @Output() toggleMenu = new EventEmitter<void>();
  @Output() onLanguageChange = new EventEmitter<string>();

  Language = Language;
  constructor() { }
}
