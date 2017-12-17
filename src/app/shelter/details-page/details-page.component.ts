import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../core/shared/reducers';
import * as fromShelter from '../shared/reducers';
import * as Layout from '../../core/shared/actions/layout';
import * as Shelter from '../shared/actions/shelter.action';
import { ShelterDto } from '../../../../common/models/shelter.model';
import { UtilService } from '../../shared/services/util/util.service';
import { ShareDialogComponent } from '../../shared/components/share-dialog/share-dialog.component';

export interface IDetailsPageComponent {
  onPreviewOpen(): void;
  onPreviewClose(): void;
  onShare(): void;
}

@Component({
  selector: 'app-shelter-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsPageComponent implements OnDestroy, IDetailsPageComponent {
  shelter: ShelterDto;
  sideNavState: boolean;
  prevSideNavState: boolean;
  galleryOptions = UtilService.galleryOptions;
  shelter$: Observable<ShelterDto>;
  showSidenav$: Observable<boolean>;
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private location: Location,
              private dialog: MatDialog,
              private store: Store<fromShelter.State>,
              @Inject(DOCUMENT) private document: Document) {
    const paramsSubscription = route.params
      .pipe(map(params => new Shelter.Select(params.id)))
      .subscribe(store);

    this.shelter$ = this.store.select(fromShelter.getSelectedShelter);
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);

    const shelterSubscription = this.shelter$.subscribe(shelter => this.shelter = shelter);
    const sidenavSubscription = this.showSidenav$.subscribe(state => this.sideNavState = state);

    this.subscriptions.push(...[paramsSubscription, shelterSubscription, sidenavSubscription]);
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
    const url = this.document.location.origin + this.router.createUrlTree(['shelters', this.shelter.id]).toString();
    const _dialogRef = this.dialog.open(ShareDialogComponent, {
      width: '300px',
      data: { url }
    });
    _dialogRef.afterClosed().subscribe(shareOptions => { });
  }
}
