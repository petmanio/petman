import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromShelter from '../shared/reducers';
import * as Shelter from '../shared/actions/shelter.action';
import { ShelterDto } from '../../../../common/models/shelter.model';
import { UtilService } from '../../shared/services/util/util.service';

@Component({
  selector: 'app-shelter-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsPageComponent implements OnDestroy {
  shelter$: Observable<ShelterDto>;
  galleryOptions = UtilService.galleryOptions;
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<fromShelter.State>, route: ActivatedRoute) {
    const paramsSubscription = route.params
      .pipe(
        map(params => new Shelter.Select(params.id))
      )
      .subscribe(store);

    this.shelter$ = this.store.select(fromShelter.getSelectedShelter);
    this.subscriptions.push(paramsSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
