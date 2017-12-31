import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../core/shared/reducers';
import * as fromWalker from './walker/walker.reducer';
import * as fromAddPage from './add-page/add-page.reducer';
import * as fromEditPage from './edit-page/edit-page.reducer';
import * as fromListPage from './list-page/list-page.reducer';

export interface WalkerState {
  walker: fromWalker.State;
  addPage: fromAddPage.State;
  listPage: fromListPage.State;
  editPage: fromEditPage.State;
}

export interface State extends fromRoot.State {
  walker: WalkerState;
}

export const reducers = {
  walker: fromWalker.reducer,
  addPage: fromAddPage.reducer,
  editPage: fromEditPage.reducer,
  listPage: fromListPage.reducer,
};

export const getWalkerState = createFeatureSelector<WalkerState>('walker');

/**
 * Entities
 */

export const getWalkerEntitiesState = createSelector(getWalkerState, state => state.walker);
export const getSelectedWalkerId = createSelector(getWalkerEntitiesState, fromWalker.getSelectedId);
export const getTotalWalkers = createSelector(getWalkerEntitiesState, fromWalker.getTotal);
export const {
  selectIds: getWalkerIds,
  selectEntities: getWalkerEntities,
  selectAll: getAllWalkers,
  selectTotal: getTotalWalkersInStore,
} = fromWalker.adapter.getSelectors(getWalkerEntitiesState);
export const getSelectedWalker = createSelector(getWalkerEntities, getSelectedWalkerId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Add Page
 */
export const getAddPageState = createSelector(getWalkerState, (state: WalkerState) => state.addPage);
export const getAddPageError = createSelector(getAddPageState, fromAddPage.getError);
export const getAddPagePending = createSelector(getAddPageState, fromAddPage.getPending);

/**
 * Edit Page
 */
export const getEditPageState = createSelector(getWalkerState, (state: WalkerState) => state.editPage);
export const getEditPageError = createSelector(getEditPageState, fromEditPage.getError);
export const getEditPagePending = createSelector(getEditPageState, fromEditPage.getPending);

/**
 * List Page
 */
export const getListPageState = createSelector(getWalkerState, (state: WalkerState) => state.listPage);
export const getListPageError = createSelector(getListPageState, fromListPage.getError);
export const getListPagePending = createSelector(getListPageState, fromListPage.getPending);
