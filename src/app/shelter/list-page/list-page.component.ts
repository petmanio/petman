import { DatePipe, DOCUMENT, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ModalSize } from '../../../../common/enums';
import { ShelterDto, ShelterListRequestDto } from '../../../../common/models/shelter.model';
import { UserDto } from '../../../../common/models/user.model';
import { Config } from '../../shared/components/card/card.component';
import { ShareDialogComponent } from '../../shared/components/share-dialog/share-dialog.component';
import * as fromAuth from '../../auth/shared/reducers';
import * as Shelter from '../shared/actions/shelter.action';
import * as fromShelter from '../shared/reducers';

export interface IListPageComponent {
  getCardConfig(item: ShelterDto): Config;

  onLoadMore(): void;

  onShare(shelter: ShelterDto): void;
}

@Component({
  selector: 'app-shelter-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit, OnDestroy, IListPageComponent {
  list: ShelterDto[];
  limit = 12;
  total: number;
  offset = 0;
  list$: Observable<ShelterDto[]>;
  total$: Observable<number>;
  error$: Observable<any>;
  pending$: Observable<boolean>;
  selectedUser$: Observable<UserDto>;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private location: Location,
              private dialog: MatDialog,
              private store: Store<fromShelter.State>,
              private datePipe: DatePipe,
              @Inject(DOCUMENT) private document: Document) {
    this.list$ = this.store.select(fromShelter.getAllShelters);
    this.total$ = this.store.select(fromShelter.getTotalShelters);
    this.error$ = this.store.select(fromShelter.getListPageError);
    this.pending$ = this.store.select(fromShelter.getListPagePending);
    this.selectedUser$ = this.store.select(fromAuth.getSelectedUser);

    const listSubscription = this.list$.subscribe(list => {
      this.list = list;
      this.offset = Math.max(0, this.list.length - this.limit);
    });
    const totalSubscription = this.total$.subscribe(total => this.total = total);

    this.subscriptions.push(...[listSubscription, totalSubscription]);
  }

  get canLoadMore(): boolean {
    return this.offset + this.limit < this.total;
  }

  private get listRequest(): ShelterListRequestDto {
    return {
      limit: this.limit,
      offset: this.offset
    };
  }

  ngOnInit(): void {
    this.store.dispatch(new Shelter.List(this.listRequest));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCardConfig(item: ShelterDto): Config {
    return {
      avatar: item.user.userData.avatar,
      title: item.user.userData.name,
      subtitle: this.datePipe.transform(item.created),
      image: item.images && item.images[0],
      price: item.price,
      contentHTML: item.description,
      actions: true
    };
  }

  onLoadMore(): void {
    if (this.canLoadMore) {
      this.offset += this.limit;
      this.store.dispatch(new Shelter.More(this.listRequest));
    }
  }

  onShare(shelter: ShelterDto): void {
    const url = this.document.location.origin + this.router.createUrlTree(['shelters', shelter.id]).toString();
    const _dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    _dialogRef.afterClosed().subscribe(shareOptions => {
    });
  }
}
