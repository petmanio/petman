import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { UserDto } from '@common/models/user.model';

interface ISidenavComponent {
  onClick($event: Event): void;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements ISidenavComponent, OnInit {
  @Input() open = false;
  @Input() mode: string;
  @Input() user: UserDto;
  @Input() selectedUser: UserDto;
  @Output() onItemActivate = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Output() onSelectedUserChange = new EventEmitter<number>();
  isHomeActive;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {

      } else if (event instanceof NavigationEnd) {
        this.isHomeActive = this.router.url === '/' ? 'pm-is-active' : '';
      }
    });
  }

  onClick($event: Event): void {
    $event.stopPropagation();
  }
}
