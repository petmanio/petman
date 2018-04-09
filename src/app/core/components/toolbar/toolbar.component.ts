import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Language } from '@common/enums';
import { UserDto } from '@common/models/user.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  @Input() loggedIn: boolean;
  @Input() selectedUser: UserDto;
  @Output() onLogOut = new EventEmitter<void>();
  @Output() toggleMenu = new EventEmitter<void>();

  Language = Language;

  constructor() {
  }
}
