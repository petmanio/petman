import { DatePipe, DOCUMENT, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ModalSize } from '../../../../common/enums';
import { AdoptDto, AdoptListRequestDto } from '../../../../common/models/adopt.model';
import { UserDto } from '../../../../common/models/user.model';
import { Config } from '../../shared/components/card/card.component';
import { ShareDialogComponent } from '../../shared/components/share-dialog/share-dialog.component';
import * as fromAuth from '../../auth/shared/reducers';
import * as Adopt from '../shared/actions/adopt.action';
import * as fromAdopt from '../shared/reducers';

export interface IListPageComponent {
  getCardConfig(item: AdoptDto): Config;
  onLoadMore(): void;
  onShare(adopt: AdoptDto): void;
}

@Component({
  selector: 'app-adopt-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit, OnDestroy, IListPageComponent {
  @ViewChild('masonry') masonry;
  list: AdoptDto[];
  limit = 12;
  total: number;
  offset = 0;
  selectedUser: UserDto;
  list$: Observable<AdoptDto[]>;
  total$: Observable<number>;
  error$: Observable<any>;
  pending$: Observable<boolean>;
  selectedUser$: Observable<UserDto>;

  get canLoadMore(): boolean {
    return this.offset + this.limit < this.total;
  }

  private subscriptions: Subscription[] = [];

  private get listRequest(): AdoptListRequestDto {
    return {
      limit: this.limit,
      offset: this.offset
    };
  }

  constructor(private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private store: Store<fromAdopt.State>,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private document: Document) {
    this.list$ = this.store.select(fromAdopt.getAllAdoption);
    this.total$ = this.store.select(fromAdopt.getTotalAdoption);
    this.error$ = this.store.select(fromAdopt.getListPageError);
    this.pending$ = this.store.select(fromAdopt.getListPagePending);
    this.selectedUser$ = this.store.select(fromAuth.getSelectedUser);

    const userSubscription = this.selectedUser$.subscribe(user => this.selectedUser = user);
    const listSubscription = this.list$.subscribe(list => {
      this.list = list;
      this.offset = Math.max(0, this.list.length - this.limit);
    });
    const totalSubscription = this.total$.subscribe(user => this.total = user);

    this.subscriptions.push(...[userSubscription, listSubscription, totalSubscription]);
  }

  ngOnInit(): void {
    this.store.dispatch(new Adopt.List(this.listRequest));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCardConfig(item: AdoptDto): Config {
    return {
      avatar: item.user.userData.avatar,
      title: item.user.userData.name,
      subtitle: this.datePipe.transform(item.created),
      image: item.images && item.images[0],
      contentHTML: item.description
    };
  }

  onLoadMore(): void {
    if (this.canLoadMore) {
      this.offset += this.limit;
      this.store.dispatch(new Adopt.More(this.listRequest));
    }
  }

  onShare(adopt: AdoptDto): void {
    const url = this.document.location.origin + this.router.createUrlTree(['adoption', adopt.id]).toString();
    const _dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    _dialogRef.afterClosed().subscribe(shareOptions => { });
  }
}
