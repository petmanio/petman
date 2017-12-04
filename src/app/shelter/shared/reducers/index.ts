import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../core/shared/reducers';
import * as fromShelter from './shelter/shelter.reducer';
import * as fromAddPage from './add-page/add-page.reducer';
import * as fromListPage from './list-page/list-page.reducer';

export interface ShelterState {
  shelter: fromShelter.State;
  addPage: fromAddPage.State;
  listPage: fromListPage.State;
}

export interface State extends fromRoot.State {
  shelter: ShelterState;
}

export const reducers = {
  shelter: fromShelter.reducer,
  addPage: fromAddPage.reducer,
  listPage: fromListPage.reducer,
};

export const getShelterState = createFeatureSelector<ShelterState>('shelter');

/**
 * Entities
 */

export const getShelterEntitiesState = createSelector(getShelterState, state => state.shelter);
export const getSelectedShelterId = createSelector(getShelterEntitiesState, fromShelter.getSelectedId);
export const getTotalShelters = createSelector(getShelterEntitiesState, fromShelter.getTotal);
export const {
  selectIds: getShelterIds,
  selectEntities: getShelterEntities,
  selectAll: getAllShelters,
  selectTotal: getTotalSheltersInStore,
} = fromShelter.adapter.getSelectors(getShelterEntitiesState);
export const getSelectedShelter = createSelector(getShelterEntities, getSelectedShelterId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Add Page
 */
export const getAddPageState = createSelector(getShelterState, (state: ShelterState) => state.addPage);
export const getAddPageError = createSelector(getAddPageState, fromAddPage.getError);
export const getAddPagePending = createSelector(getAddPageState, fromAddPage.getPending);

/**
 * List Page
 */
export const getListPageState = createSelector(getShelterState, (state: ShelterState) => state.listPage);
export const getListPageError = createSelector(getListPageState, fromListPage.getError);
export const getListPagePending = createSelector(getListPageState, fromListPage.getPending);
