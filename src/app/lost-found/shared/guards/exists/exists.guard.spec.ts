import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
// import { cold } from 'jasmine-marbles';
import { ExistsGuard } from './exists.guard';
import * as fromRoot from '../../../../core/reducers';
import * as fromLostFound from '../../reducers';

describe('LostFound Guard', () => {
  let guard: ExistsGuard;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          lostFound: combineReducers(fromLostFound.reducers),
        }),
      ],
      providers: [ExistsGuard],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    guard = TestBed.get(ExistsGuard);
  });

  it('should return false if the user state is not logged in', () => {
    // const expected = cold('(a|)', { a: false });

    // expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return true if the user state is logged in', () => {
    const user: any = {};
    // const action = new LostFound.LoginSuccess({ user });
    // store.dispatch(action);

    // const expected = cold('(a|)', { a: true });

    // expect(guard.canActivate()).toBeObservable(expected);
  });
});
