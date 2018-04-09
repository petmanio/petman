import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../core/reducers';
import * as fromListPage from './list-page/list-page.reducer';

export interface MapState {
  listPage: fromListPage.State;
}

export interface State extends fromRoot.State {
  map: MapState;
}

export const reducers = {
  listPage: fromListPage.reducer,
};

export const getMapState = createFeatureSelector<MapState>('map');

/**
 * List Page
 */
export const getListPageState = createSelector(getMapState, (state: MapState) => state.listPage);
export const getListPageError = createSelector(getListPageState, fromListPage.getError);
export const getListPagePending = createSelector(getListPageState, fromListPage.getPending);
