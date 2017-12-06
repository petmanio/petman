import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromAuth from '../../auth/shared/reducers';
import * as fromShelter from '../shared/reducers';
import * as Shelter from '../shared/actions/shelter.action';
import { ShelterDto, ShelterListRequestDto } from '../../../../common/models/shelter.model';
import { UserDto } from '../../../../common/models/user.model';
import { Config } from '../../shared/components/card/card.component';

export interface IListPageComponent {
  getCardConfig(item: ShelterDto): Config;
}

@Component({
  selector: 'app-shelter-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit, OnDestroy, IListPageComponent  {
  offset = 0;
  limit = 12;
  selectedUser: UserDto;
  list$: Observable<ShelterDto[]>;
  total$: Observable<number>;
  selectedUser$: Observable<UserDto>;
  private subscriptions: Subscription[] = [];

  private get listRequest(): ShelterListRequestDto {
    return {
      limit: this.limit,
      offset: this.offset
    };
  }

  constructor(private store: Store<fromShelter.State>, private datePipe: DatePipe) {
    this.list$ = this.store.select(fromShelter.getAllShelters);
    this.total$ = this.store.select(fromShelter.getTotalShelters);
    this.selectedUser$ = this.store.select(fromAuth.getSelectedUser);

    const userSubscription = this.selectedUser$.subscribe(user => this.selectedUser = user);
    this.subscriptions.push(userSubscription);
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
      image: item.images[0],
      content: item.description
    };
  }
}
