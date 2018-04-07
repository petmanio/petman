import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromWalker from '../shared/reducers';
import * as Walker from '../shared/actions/walker.action';
import { ModalSize } from '../../../../common/enums';
import { WalkerDto } from '../../../../common/models/walker.model';
import { ShareDialogComponent } from '../../shared/components/share-dialog/share-dialog.component';

export interface IDetailsPageComponent {
  onShare(): void;
}

@Component({
  selector: 'app-walker-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsPageComponent implements OnDestroy, IDetailsPageComponent {
  walker: WalkerDto;
  walker$: Observable<WalkerDto>;
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private dialog: MatDialog,
              private store: Store<fromWalker.State>,
              @Inject(DOCUMENT) private document: Document) {
    const paramsSubscription = route.params
      .pipe(map(params => new Walker.Select(params.id)))
      .subscribe(store);

    this.walker$ = this.store.select(fromWalker.getSelectedWalker);

    const walkerSubscription = this.walker$.subscribe(walker => this.walker = walker);

    this.subscriptions.push(...[paramsSubscription, walkerSubscription]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onShare(): void {
    const url = this.document.location.origin + this.router.createUrlTree(['walkers', this.walker.id]).toString();
    const _dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    _dialogRef.afterClosed().subscribe(shareOptions => {
    });
  }
}
