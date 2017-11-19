import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UserDto } from '../../../../../../common/models/user.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() loggedIn: boolean;
  @Input() selectedUser: UserDto;
  @Output() onLogOut = new EventEmitter<void>();
  @Output() toggleMenu = new EventEmitter<void>();
  constructor() { }
}
