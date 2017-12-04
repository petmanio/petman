import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';

import * as fromShelter from '../shared/reducers';
import * as Shelter from '../shared/actions/shelter.action';
import { ShelterDto, ShelterListRequestDto } from '../../../../common/models/shelter.model';
import { Config } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-shelter-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit  {
  offset = 0;
  limit = 12;
  total$ = this.store.select(fromShelter.getTotalShelters);
  list$ = this.store.select(fromShelter.getAllShelters);

  constructor(private store: Store<fromShelter.State>, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.store.dispatch(new Shelter.List(this.listRequest));
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

  private get listRequest(): ShelterListRequestDto {
    return {
      limit: this.limit,
      offset: this.offset
    };
  }
}
