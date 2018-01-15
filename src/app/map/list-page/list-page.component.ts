import { DatePipe, DOCUMENT, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ModalSize } from '../../../../common/enums';
import { OrganizationDto, OrganizationListRequestDto } from '../../../../common/models/organization.model';
import { UserDto } from '../../../../common/models/user.model';
import { Config } from '../../shared/components/card/card.component';
import { ShareDialogComponent } from '../../shared/components/share-dialog/share-dialog.component';
import * as fromAuth from '../../auth/shared/reducers';
import * as fromOrganization from '../../organization/shared/reducers';
import * as fromMap from '../shared/reducers';
import * as Organization from '../../organization/shared/actions/organization.action';

export interface IListPageComponent {
  getCardConfig(item: OrganizationDto): Config;
  onLoadMore(): void;
  onShare(map: OrganizationDto): void;
}

@Component({
  selector: 'app-map-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit, OnDestroy, IListPageComponent {
  list: OrganizationDto[];
  limit = 12;
  total: number;
  offset = 0;
  list$: Observable<OrganizationDto[]>;
  total$: Observable<number>;
  error$: Observable<any>;
  pending$: Observable<boolean>;
  selectedUser$: Observable<UserDto>;

  get canLoadMore(): boolean {
    return this.offset + this.limit < this.total;
  }

  private subscriptions: Subscription[] = [];

  private get listRequest(): OrganizationListRequestDto {
    return {
      limit: this.limit,
      offset: this.offset
    };
  }

  constructor(private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private store: Store<fromOrganization.State>,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private document: Document) {
    this.selectedUser$ = this.store.select(fromAuth.getSelectedUser);

    this.list$ = this.store.select(fromOrganization.getAllOrganizations);
    this.total$ = this.store.select(fromOrganization.getTotalOrganizations);

    this.error$ = this.store.select(fromMap.getListPageError);
    this.pending$ = this.store.select(fromMap.getListPagePending);

    const listSubscription = this.list$.subscribe(list => {
      this.list = list;
      this.offset = Math.max(0, this.list.length - this.limit);
    });
    const totalSubscription = this.total$.subscribe(user => this.total = user);

    this.subscriptions.push(...[listSubscription, totalSubscription]);
  }

  ngOnInit(): void {
    this.store.dispatch(new Organization.List(this.listRequest));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCardConfig(item: OrganizationDto): Config {
    return {
      avatar: item.user.userData.avatar,
      title: item.user.userData.name,
      subtitle: this.datePipe.transform(item.created),
      image: item.images && item.images[0],
      contentHTML: item.description,
    };
  }

  onLoadMore(): void {
    if (this.canLoadMore) {
      this.offset += this.limit;
      this.store.dispatch(new Organization.More(this.listRequest));
    }
  }

  onShare(map: OrganizationDto): void {
    const url = this.document.location.origin + this.router.createUrlTree(['maps', map.id]).toString();
    const _dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    _dialogRef.afterClosed().subscribe(shareOptions => { });
  }
}