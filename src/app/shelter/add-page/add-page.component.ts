import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileHolder } from 'angular2-image-upload';
import { findIndex } from 'lodash';
import { Store } from '@ngrx/store';

import * as fromShelter from '../shared/reducers';

export interface IAddPageComponent {
  onUploadFinished($event: FileHolder): void;
  onImageRemove($event: FileHolder): void;
  save(): void;
}

@Component({
  selector: 'app-shelter-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements IAddPageComponent {
  form: FormGroup;

  constructor(@Inject(FormBuilder) private fb: FormBuilder, private store: Store<fromShelter.State>) {
    this.form = fb.group({
      price: ['', Validators.required],
      description: ['', Validators.required],
      images: fb.array(
        [],
        Validators.compose([Validators.required, Validators.minLength(1)]
      ))
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

  save(): void {
    console.log(this.form.value);
  }
}
