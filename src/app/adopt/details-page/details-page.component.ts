import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../core/shared/reducers';
import * as fromAdopt from '../shared/reducers';
import * as Layout from '../../core/shared/actions/layout';
import * as Adopt from '../shared/actions/adopt.action';
import { ModalSize } from '../../../../common/enums';
import { AdoptDto } from '../../../../common/models/adopt.model';
import { UtilService } from '../../shared/services/util/util.service';
import { ShareDialogComponent } from '../../shared/components/share-dialog/share-dialog.component';

export interface IDetailsPageComponent {
  onPreviewOpen(): void;
  onPreviewClose(): void;
  onShare(): void;
}

@Component({
  selector: 'app-adopt-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsPageComponent implements OnDestroy, IDetailsPageComponent {
  adopt: AdoptDto;
  sideNavState: boolean;
  prevSideNavState: boolean;
  galleryOptions = UtilService.galleryOptions;
  adopt$: Observable<AdoptDto>;
  showSidenav$: Observable<boolean>;
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private dialog: MatDialog,
              private store: Store<fromAdopt.State>,
              @Inject(DOCUMENT) private document: Document) {
    const paramsSubscription = route.params
      .pipe(map(params => new Adopt.Select(params.id)))
      .subscribe(store);

    this.adopt$ = this.store.select(fromAdopt.getSelectedAdopt);
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);

    const adoptSubscription = this.adopt$.subscribe(adopt => this.adopt = adopt);
    const sidenavSubscription = this.showSidenav$.subscribe(state => this.sideNavState = state);

    this.subscriptions.push(...[paramsSubscription, adoptSubscription, sidenavSubscription]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onPreviewOpen(): void {
    this.prevSideNavState = this.sideNavState;
    if (this.prevSideNavState) {
      this.store.dispatch(new Layout.CloseSidenav());
    }
  }

  onPreviewClose(): void {
    if (this.prevSideNavState) {
      this.store.dispatch(new Layout.OpenSidenav());
    }
  }

  onShare(): void {
    const url = this.document.location.origin + this.router.createUrlTree(['adoption', this.adopt.id]).toString();
    const _dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    _dialogRef.afterClosed().subscribe(shareOptions => { });
  }
}
