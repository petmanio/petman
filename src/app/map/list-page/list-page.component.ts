import { DatePipe, DOCUMENT, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { find } from 'lodash';

import * as fromAuth from '../../auth/shared/reducers';
import * as fromOrganization from '../../organization/shared/reducers';
import * as fromService from '../../shared/reducers';
import * as fromMap from '../shared/reducers';
import * as Organization from '../../organization/shared/actions/organization.action';
import {
  OrganizationDto,
  OrganizationListRequestDto,
  OrganizationPinDto,
  OrganizationPinsRequestDto
} from '../../../../common/models/organization.model';
import { BranchDto } from '../../../../common/models/branch.model';
import { UserDto } from '../../../../common/models/user.model';
import { Config } from '../../shared/components/card/card.component';
import { OrganizationPinType } from '../../../../common/enums';
import { Pin } from '../../../../common/shared';
import { GoogleMapComponent } from '../../shared/components/google-map/google-map.component';
import { ServiceDto } from '../../../../common/models/service.model';

export interface IListPageComponent {
  getCardConfig(item: OrganizationDto | BranchDto): Config;

  getPinData(entity: OrganizationDto | BranchDto | OrganizationPinDto): Pin

  onLoadMore(): void;

  updateList(): void;

  panTo(org: BranchDto | OrganizationDto): void;
}

@Component({
  selector: 'app-map-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit, OnDestroy, IListPageComponent {
  @ViewChild(GoogleMapComponent) map: GoogleMapComponent;
  list: OrganizationDto[];
  limit = 12;
  total: number;
  offset = 0;
  selectedServices: number[];
  pins: Pin[] = [];
  list$: Observable<OrganizationDto[]>;
  total$: Observable<number>;
  pins$: Observable<OrganizationPinDto[]>;
  services$: Observable<ServiceDto[]>;
  error$: Observable<any>;
  pending$: Observable<boolean>;
  selectedUser$: Observable<UserDto>;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private location: Location,
              private dialog: MatDialog,
              private store: Store<fromOrganization.State>,
              private datePipe: DatePipe,
              @Inject(DOCUMENT) private document: Document) {

    this.selectedUser$ = this.store.select(fromAuth.getSelectedUser);
    this.list$ = this.store.select(fromOrganization.getAllOrganizations);
    this.total$ = this.store.select(fromOrganization.getTotalOrganizations);
    this.pins$ = this.store.select(fromOrganization.getAllPins);
    this.services$ = this.store.select(fromService.getServiceAll);
    this.error$ = this.store.select(fromMap.getListPageError);
    this.pending$ = this.store.select(fromMap.getListPagePending);

    const listSubscription = this.list$.subscribe(list => {
      this.list = list;
      this.offset = Math.max(0, this.list.length - this.limit);
    });
    const totalSubscription = this.total$.subscribe(total => this.total = total);

    const pinsSubscription = this.pins$.subscribe(pins => {
      this.pins = pins.map(pin => this.getPinData(pin));
    });

    this.subscriptions.push(...[listSubscription, totalSubscription, pinsSubscription]);
  }

  get canLoadMore(): boolean {
    return this.offset + this.limit < this.total;
  }

  private get listRequest(): OrganizationListRequestDto {
    return {
      limit: this.limit,
      offset: this.offset,
      service: this.selectedServices
    };
  }

  private get pinsRequest(): OrganizationPinsRequestDto {
    return {
      service: this.selectedServices
    };
  }

  private static pinInfoWindowContentFn(pin: Pin): string {
    return `
      ${pin.title} <br/>
      ${pin.meta.description || ''} <br/>
      ${pin.meta.address.fullAddressHTML()}&nbsp;
    `;
  }

  ngOnInit(): void {
    this.store.dispatch(new Organization.List(this.listRequest));
    this.store.dispatch(new Organization.Pins(this.pinsRequest));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCardConfig(item: OrganizationDto | BranchDto): Config {
    return {
      title: item.title,
      subtitle: this.datePipe.transform(item.created),
      image: item.images && item.images[0],
      chips: item.services.map<any>(service => ({ color: '', text: service.title })),
      content: item.description
    };
  }

  getPinData(entity: OrganizationDto | BranchDto | OrganizationPinDto): Pin {
    return {
      lat: entity.address.geometry.coordinates[0],
      lng: entity.address.geometry.coordinates[1],
      title: entity.title,
      meta: entity,
      infoWindow: {
        contentFn: ListPageComponent.pinInfoWindowContentFn
      }
    };
  }

  onLoadMore(): void {
    if (this.canLoadMore) {
      this.offset += this.limit;
      this.store.dispatch(new Organization.More(this.listRequest));
    }
  }

  updateList(): void {
    this.offset = 0;
    this.limit = 12;
    this.store.dispatch(new Organization.List(this.listRequest));
    this.store.dispatch(new Organization.Pins(this.pinsRequest));
  }

  panTo(org: BranchDto | OrganizationDto): void {
    const foundPin = find(this.pins, pin => {
      const type = org instanceof BranchDto ? OrganizationPinType.BRANCH
        : OrganizationPinType.ORGANIZATION;
      return pin.meta.type === type && pin.meta.id === org.id;
    });

    if (foundPin) {
      this.map.panToPin(foundPin);
    }
  }
}
