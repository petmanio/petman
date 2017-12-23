import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FileHolder } from 'angular2-image-upload';
import { cloneDeep, findIndex, map } from 'lodash';

import * as fromAdopt from '../shared/reducers';
import * as Adopt from '../shared/actions/adopt.action';

export interface IAddPageComponent {
  onUploadFinished($event: FileHolder): void;
  onImageRemove($event: FileHolder): void;
  create(): void;
}

@Component({
  selector: 'app-adopt-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPageComponent implements IAddPageComponent {
  error$: Observable<any>;
  pending$: Observable<boolean>;
  form: FormGroup;

  constructor(@Inject(FormBuilder) private fb: FormBuilder, private store: Store<fromAdopt.State>) {
    this.error$ = this.store.select(fromAdopt.getAddPageError);
    this.pending$ = this.store.select(fromAdopt.getAddPagePending);

    this.form = fb.group({
      price: ['', Validators.required],
      description: ['', Validators.required],
      images: fb.array([], Validators.compose([Validators.required, Validators.minLength(1)]))
    });
  }

  onUploadFinished($event: FileHolder): void {
    const images = <FormArray>this.form.get('images');
    images.push(new FormControl($event));
  }

  onImageRemove($event: FileHolder): void {
    const images = <FormArray>this.form.get('images');
    const index = findIndex<FileHolder>(images.value, file => file.src === $event.src);
    if (index !== -1) {
      images.removeAt(index);
    }
  }

  create(): void {
    const body = cloneDeep(this.form.value);
    body.images = map<FileHolder, File>(body.images, image => image.file);
    this.store.dispatch(new Adopt.Create(body));
  }
}
