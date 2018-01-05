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

import * as LostFound from '../shared/actions/lost-found.action';
import * as fromLostFound from '../shared/reducers';
import { LostFoundType, ModalSize } from '../../../../common/enums';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { LostFoundDto } from '../../../../common/models/lost-found.model';

export interface IEditPageComponent {
  onUploadFinished($event: FileHolder): void;
  onImageRemove($event: FileHolder): void;
  update(): void;
  onDelete(): void;
}

@Component({
  selector: 'app-lost-found-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnDestroy, IEditPageComponent {
  @ViewChild('imageUpload') imageUpload;
  LostFoundType = LostFoundType;
  form: FormGroup;
  lostFound: LostFoundDto;
  error$: Observable<any>;
  pending$: Observable<boolean>;
  lostFound$: Observable<LostFoundDto>;
  private subscriptions: Subscription[] = [];

  private get formConfig(): FormGroup {
    return this.fb.group({
      id: this.lostFound.id,
      type: [this.lostFound.type, Validators.required],
      description: [this.lostFound.description, Validators.required],
      images: this.fb.array(this.lostFound.images, Validators.compose([Validators.required, Validators.minLength(1)]))
    });
  }

  constructor(@Inject(FormBuilder) private fb: FormBuilder,
              private dialog: MatDialog,
              private store: Store<fromLostFound.State>,
              private route: ActivatedRoute) {
    this.error$ = this.store.select(fromLostFound.getEditPageError);
    this.pending$ = this.store.select(fromLostFound.getEditPagePending);

    const paramsSubscription = route.params
      .pipe(mapRx(params => new LostFound.Select(params.id)))
      .subscribe(store);

    this.lostFound$ = this.store.select(fromLostFound.getSelectedLostFound);

    const lostFoundSubscription = this.lostFound$.subscribe(lostFound => {
      if (lostFound) {
        this.lostFound = lostFound;
        this.form = this.formConfig;
      }
    });

    this.subscriptions.push(...[paramsSubscription, lostFoundSubscription]);
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
    this.store.dispatch(new LostFound.Update(body));
  }

  onDelete(): void {
    const _dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: ModalSize.MEDIUM,
      data: {}
    });
    _dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new LostFound.Delete(this.lostFound));
      }
    });
  }
}
