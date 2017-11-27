import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../core/shared/reducers';
import * as fromShelter from './shelter/shelter.reducer';
import * as fromAddPage from './add-page/add-page.reducer';

export interface ShelterState {
  shelter: fromShelter.State;
  addPage: fromAddPage.State;
}

export interface State extends fromRoot.State {
  shelter: ShelterState;
}

export const reducers = {
  shelter: fromShelter.reducer,
  addPage: fromAddPage.reducer,
};

export const getShelterState = createFeatureSelector<ShelterState>('shelter');

/**
 * Entities
 */

export const getShelterEntitiesState = createSelector(getShelterState, state => state.shelter);
export const getSelectedShelterId = createSelector(getShelterEntitiesState, fromShelter.getSelectedId);
export const {
  selectIds: getShelterIds,
  selectEntities: getShelterEntities,
  selectAll: getAllShelters,
  selectTotal: getTotalShelters,
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
