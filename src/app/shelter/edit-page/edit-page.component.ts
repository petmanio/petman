import { ChangeDetectionStrategy, Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FileHolder } from 'angular2-image-upload';
import { cloneDeep, findIndex, map } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { map as mapRx } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import * as Shelter from '../shared/actions/shelter.action';
import * as fromShelter from '../shared/reducers';
import { ModalSize } from '../../../../common/enums';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ShelterDto } from '../../../../common/models/shelter.model';

export interface IEditPageComponent {
  onUploadFinished($event: FileHolder): void;

  onImageRemove($event: FileHolder): void;

  update(): void;

  onDelete(): void;
}

@Component({
  selector: 'app-shelter-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnDestroy, IEditPageComponent {
  @ViewChild('imageUpload') imageUpload;
  form: FormGroup;
  shelter: ShelterDto;
  error$: Observable<any>;
  pending$: Observable<boolean>;
  shelter$: Observable<ShelterDto>;
  private subscriptions: Subscription[] = [];

  constructor(@Inject(FormBuilder) private fb: FormBuilder,
              private dialog: MatDialog,
              private store: Store<fromShelter.State>,
              private route: ActivatedRoute) {
    this.error$ = this.store.select(fromShelter.getEditPageError);
    this.pending$ = this.store.select(fromShelter.getEditPagePending);

    const paramsSubscription = route.params
      .pipe(mapRx(params => new Shelter.Select(params.id)))
      .subscribe(store);

    this.shelter$ = this.store.select(fromShelter.getSelectedShelter);

    const shelterSubscription = this.shelter$.subscribe(shelter => {
      if (shelter) {
        this.shelter = shelter;
        this.form = this.formConfig;
      }
    });

    this.subscriptions.push(...[paramsSubscription, shelterSubscription]);
  }

  private get formConfig(): FormGroup {
    return this.fb.group({
      id: this.shelter.id,
      price: [this.shelter.price, Validators.required],
      description: [this.shelter.description, Validators.required],
      images: this.fb.array(this.shelter.images, Validators.compose([Validators.required, Validators.minLength(1)]))
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onUploadFinished($event: FileHolder): void {
    const images = <FormArray>this.form.get('images');
    images.push(new FormControl($event));

    // TODO: tmp fix, remove this fu*king piece of code after image upload new release
    while (images.value.length > 4) {
      images.removeAt(0);
    }

    while (this.imageUpload.files.length > 4) {
      this.imageUpload.files.shift();
    }
  }

  onImageRemove($event: FileHolder): void {
    const images = <FormArray>this.form.get('images');
    const index = findIndex<any>(images.value, file => (file.src === $event.src || file === $event.src));
    if (index !== -1) {
      images.removeAt(index);
    }
  }

  update(): void {
    const body = cloneDeep(this.form.value);
    body.images = map<any>(body.images, image => image.file || image);
    this.store.dispatch(new Shelter.Update(body));
  }

  onDelete(): void {
    const _dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: ModalSize.MEDIUM,
      data: {}
    });
    _dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new Shelter.Delete(this.shelter));
      }
    });
  }
}
