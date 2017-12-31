import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FileHolder } from 'angular2-image-upload';
import { cloneDeep, map } from 'lodash';

import * as fromWalker from '../shared/reducers';
import * as Walker from '../shared/actions/walker.action';

export interface IAddPageComponent {
  create(): void;
}

@Component({
  selector: 'app-walker-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPageComponent implements IAddPageComponent {
  error$: Observable<any>;
  pending$: Observable<boolean>;
  form: FormGroup;

  constructor(@Inject(FormBuilder) private fb: FormBuilder, private store: Store<fromWalker.State>) {
    this.error$ = this.store.select(fromWalker.getAddPageError);
    this.pending$ = this.store.select(fromWalker.getAddPagePending);

    this.form = fb.group({
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  create(): void {
    const body = cloneDeep(this.form.value);
    this.store.dispatch(new Walker.Create(body));
  }
}
