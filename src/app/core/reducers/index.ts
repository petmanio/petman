import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@environments/environment';

import { RouterStateUrl } from '@shared/lib/util';

import * as fromLayout from './layout';
import { CLEAR } from '../actions';

export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

// FIXME: generic with <City> not working
export const reducers: ActionReducerMap<any> = {
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    // console.log('state', state);
    // console.log('action', action);

    return reducer(state, action);
  };
}

export function clear(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    return reducer(action.type === CLEAR ? undefined : state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [clear, logger, storeFreeze] : [clear];

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);
