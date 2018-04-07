import { ChangeDetectionStrategy, Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { map as mapRx } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import * as Walker from '../shared/actions/walker.action';
import * as fromWalker from '../shared/reducers';
import { ModalSize } from '../../../../common/enums';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { WalkerDto } from '../../../../common/models/walker.model';

export interface IEditPageComponent {
  update(): void;

  onDelete(): void;
}

@Component({
  selector: 'app-walker-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnDestroy, IEditPageComponent {
  @ViewChild('imageUpload') imageUpload;
  form: FormGroup;
  walker: WalkerDto;
  error$: Observable<any>;
  pending$: Observable<boolean>;
  walker$: Observable<WalkerDto>;
  private subscriptions: Subscription[] = [];

  constructor(@Inject(FormBuilder) private fb: FormBuilder,
              private dialog: MatDialog,
              private store: Store<fromWalker.State>,
              private route: ActivatedRoute) {
    this.error$ = this.store.select(fromWalker.getEditPageError);
    this.pending$ = this.store.select(fromWalker.getEditPagePending);

    const paramsSubscription = route.params
      .pipe(mapRx(params => new Walker.Select(params.id)))
      .subscribe(store);

    this.walker$ = this.store.select(fromWalker.getSelectedWalker);

    const walkerSubscription = this.walker$.subscribe(walker => {
      if (walker) {
        this.walker = walker;
        this.form = this.formConfig;
      }
    });

    this.subscriptions.push(...[paramsSubscription, walkerSubscription]);
  }

  private get formConfig(): FormGroup {
    return this.fb.group({
      id: this.walker.id,
      price: [this.walker.price, Validators.required],
      description: [this.walker.description, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  update(): void {
    const body = cloneDeep(this.form.value);
    this.store.dispatch(new Walker.Update(body));
  }

  onDelete(): void {
    const _dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: ModalSize.MEDIUM,
      data: {}
    });
    _dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new Walker.Delete(this.walker));
      }
    });
  }
}
