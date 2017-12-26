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

import * as Adopt from '../shared/actions/adopt.action';
import * as fromAdopt from '../shared/reducers';
import { AdoptDto } from '../../../../common/models/adopt.model';
import { ConfirmationDialogComponent } from './../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ModalSize } from '../../../../common/enums';

export interface IEditPageComponent {
  onUploadFinished($event: FileHolder): void;
  onImageRemove($event: FileHolder): void;
  update(): void;
  onDelete(): void;
}

@Component({
  selector: 'app-adopt-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnDestroy, IEditPageComponent {
  @ViewChild('imageUpload') imageUpload;
  form: FormGroup;
  adopt: AdoptDto;
  error$: Observable<any>;
  pending$: Observable<boolean>;
  adopt$: Observable<AdoptDto>;
  private subscriptions: Subscription[] = [];

  private get formConfig(): FormGroup {
    return this.fb.group({
      id: this.adopt.id,
      description: [this.adopt.description, Validators.required],
      images: this.fb.array(this.adopt.images, Validators.compose([Validators.required, Validators.minLength(1)]))
    });
  }

  constructor(@Inject(FormBuilder) private fb: FormBuilder,
              private dialog: MatDialog,
              private store: Store<fromAdopt.State>,
              private route: ActivatedRoute) {
    this.error$ = this.store.select(fromAdopt.getEditPageError);
    this.pending$ = this.store.select(fromAdopt.getEditPagePending);

    const paramsSubscription = route.params
      .pipe(mapRx(params => new Adopt.Select(params.id)))
      .subscribe(store);

    this.adopt$ = this.store.select(fromAdopt.getSelectedAdopt);

    const adoptSubscription = this.adopt$.subscribe(adopt => {
      if (adopt) {
        this.adopt = adopt;
        this.form = this.formConfig;
      }
    });

    this.subscriptions.push(...[paramsSubscription, adoptSubscription]);
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
    this.store.dispatch(new Adopt.Update(body));
  }

  onDelete(): void {
    const _dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: ModalSize.MEDIUM,
      data: {}
    });
    _dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new Adopt.Delete(this.adopt));
      }
    });
  }
}
