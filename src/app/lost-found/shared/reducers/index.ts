import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../core/shared/reducers';
import * as fromLostFound from './lost-found/lost-found.reducer';
import * as fromAddPage from './add-page/add-page.reducer';
import * as fromEditPage from './edit-page/edit-page.reducer';
import * as fromListPage from './list-page/list-page.reducer';

export interface LostFoundState {
  lostFound: fromLostFound.State;
  addPage: fromAddPage.State;
  listPage: fromListPage.State;
  editPage: fromEditPage.State;
}

export interface State extends fromRoot.State {
  lostFound: LostFoundState;
}

export const reducers = {
  lostFound: fromLostFound.reducer,
  addPage: fromAddPage.reducer,
  editPage: fromEditPage.reducer,
  listPage: fromListPage.reducer,
};

export const getLostFoundState = createFeatureSelector<LostFoundState>('lostFound');

/**
 * Entities
 */

export const getLostFoundEntitiesState = createSelector(getLostFoundState, state => state.lostFound);
export const getSelectedLostFoundId = createSelector(getLostFoundEntitiesState, fromLostFound.getSelectedId);
export const getTotalLostFound = createSelector(getLostFoundEntitiesState, fromLostFound.getTotal);
export const {
  selectIds: getLostFoundIds,
  selectEntities: getLostFoundEntities,
  selectAll: getAllLostFound,
  selectTotal: getTotalLostFoundInStore,
} = fromLostFound.adapter.getSelectors(getLostFoundEntitiesState);
export const getSelectedLostFound = createSelector(getLostFoundEntities, getSelectedLostFoundId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Add Page
 */
export const getAddPageState = createSelector(getLostFoundState, (state: LostFoundState) => state.addPage);
export const getAddPageError = createSelector(getAddPageState, fromAddPage.getError);
export const getAddPagePending = createSelector(getAddPageState, fromAddPage.getPending);

/**
 * Edit Page
 */
export const getEditPageState = createSelector(getLostFoundState, (state: LostFoundState) => state.editPage);
export const getEditPageError = createSelector(getEditPageState, fromEditPage.getError);
export const getEditPagePending = createSelector(getEditPageState, fromEditPage.getPending);

/**
 * List Page
 */
export const getListPageState = createSelector(getLostFoundState, (state: LostFoundState) => state.listPage);
export const getListPageError = createSelector(getListPageState, fromListPage.getError);
export const getListPagePending = createSelector(getListPageState, fromListPage.getPending);
