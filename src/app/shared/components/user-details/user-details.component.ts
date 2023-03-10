import { Component, Input, OnInit } from '@angular/core';

import { UserDto } from '../../../../../common/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() user: UserDto;

  constructor() {
  }

  ngOnInit() {
  }

}
