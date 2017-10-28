import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-form-social',
  templateUrl: './login-form-social.component.html',
  styleUrls: ['./login-form-social.component.scss']
})
export class LoginFormSocialComponent implements OnInit {
  @Input() errorMessage: string | null;
  @Input() pending: boolean;
  @Output() submitted = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
