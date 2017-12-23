import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../core/shared/reducers';
import * as fromAdopt from './adopt/adopt.reducer';
import * as fromAddPage from './add-page/add-page.reducer';
import * as fromEditPage from './edit-page/edit-page.reducer';
import * as fromListPage from './list-page/list-page.reducer';

export interface AdoptState {
  adopt: fromAdopt.State;
  addPage: fromAddPage.State;
  listPage: fromListPage.State;
  editPage: fromEditPage.State;
}

export interface State extends fromRoot.State {
  adopt: AdoptState;
}

export const reducers = {
  adopt: fromAdopt.reducer,
  addPage: fromAddPage.reducer,
  editPage: fromEditPage.reducer,
  listPage: fromListPage.reducer,
};

export const getAdoptState = createFeatureSelector<AdoptState>('adopt');

/**
 * Entities
 */

export const getAdoptEntitiesState = createSelector(getAdoptState, state => state.adopt);
export const getSelectedAdoptId = createSelector(getAdoptEntitiesState, fromAdopt.getSelectedId);
export const getTotalAdoption = createSelector(getAdoptEntitiesState, fromAdopt.getTotal);
export const {
  selectIds: getAdoptIds,
  selectEntities: getAdoptEntities,
  selectAll: getAllAdoption,
  selectTotal: getTotalAdoptionInStore,
} = fromAdopt.adapter.getSelectors(getAdoptEntitiesState);
export const getSelectedAdopt = createSelector(getAdoptEntities, getSelectedAdoptId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Add Page
 */
export const getAddPageState = createSelector(getAdoptState, (state: AdoptState) => state.addPage);
export const getAddPageError = createSelector(getAddPageState, fromAddPage.getError);
export const getAddPagePending = createSelector(getAddPageState, fromAddPage.getPending);

/**
 * Edit Page
 */
export const getEditPageState = createSelector(getAdoptState, (state: AdoptState) => state.editPage);
export const getEditPageError = createSelector(getEditPageState, fromEditPage.getError);
export const getEditPagePending = createSelector(getEditPageState, fromEditPage.getPending);

/**
 * List Page
 */
export const getListPageState = createSelector(getAdoptState, (state: AdoptState) => state.listPage);
export const getListPageError = createSelector(getListPageState, fromListPage.getError);
export const getListPagePending = createSelector(getListPageState, fromListPage.getPending);
