import { DatePipe, DOCUMENT, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { LostFoundType, ModalSize } from '../../../../common/enums';
import { LostFoundDto, LostFoundListRequestDto } from '../../../../common/models/lost-found.model';
import { UserDto } from '../../../../common/models/user.model';
import { Config } from '../../shared/components/card/card.component';
import { ShareDialogComponent } from '../../shared/components/share-dialog/share-dialog.component';
import * as fromAuth from '../../auth/shared/reducers';
import * as LostFound from '../shared/actions/lost-found.action';
import * as fromLostFound from '../shared/reducers';

export interface IListPageComponent {
  getCardConfig(item: LostFoundDto): Config;
  onLoadMore(): void;
  onShare(lostFound: LostFoundDto): void;
}

@Component({
  selector: 'app-lost-found-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit, OnDestroy, IListPageComponent {
  list: LostFoundDto[];
  limit = 12;
  total: number;
  offset = 0;
  selectedUser: UserDto;
  list$: Observable<LostFoundDto[]>;
  total$: Observable<number>;
  error$: Observable<any>;
  pending$: Observable<boolean>;
  selectedUser$: Observable<UserDto>;

  get canLoadMore(): boolean {
    return this.offset + this.limit < this.total;
  }

  private subscriptions: Subscription[] = [];

  private get listRequest(): LostFoundListRequestDto {
    return {
      limit: this.limit,
      offset: this.offset
    };
  }

  constructor(private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private store: Store<fromLostFound.State>,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private document: Document) {
    this.list$ = this.store.select(fromLostFound.getAllLostFound);
    this.total$ = this.store.select(fromLostFound.getTotalLostFound);
    this.error$ = this.store.select(fromLostFound.getListPageError);
    this.pending$ = this.store.select(fromLostFound.getListPagePending);
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
    this.store.dispatch(new LostFound.List(this.listRequest));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCardConfig(item: LostFoundDto): Config {
    return {
      avatar: item.user.userData.avatar,
      title: item.user.userData.name,
      subtitle: this.datePipe.transform(item.created),
      chip: { color: item.type === LostFoundType.FOUND ? 'accent' : 'warn', text: item.type },
      image: item.images && item.images[0],
      contentHTML: item.description
    };
  }

  onLoadMore(): void {
    if (this.canLoadMore) {
      this.offset += this.limit;
      this.store.dispatch(new LostFound.More(this.listRequest));
    }
  }

  onShare(lostFound: LostFoundDto): void {
    const url = this.document.location.origin + this.router.createUrlTree(['lostFound', lostFound.id]).toString();
    const _dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    _dialogRef.afterClosed().subscribe(shareOptions => { });
  }
}
