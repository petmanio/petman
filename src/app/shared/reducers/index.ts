import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../core/reducers';
import * as fromShared from './shared/shared.reducer';

export interface SharedState {
  shared: fromShared.State;
}

export interface State extends fromRoot.State {
  shared: SharedState;
}

export const reducers = {
  shared: fromShared.reducer
};

export const getSharedState = createFeatureSelector<SharedState>('shared');

/**
 * Entities
 */

export const getSharedEntitiesState = createSelector(getSharedState, state => state.shared);
export const getServiceSelectedId = createSelector(getSharedEntitiesState, fromShared.getServiceSelectedId);
export const getServiceTotal = createSelector(getSharedEntitiesState, fromShared.getServiceTotal);
export const {
  selectEntities: getServiceEntities,
  selectAll: getServiceAll,
  selectTotal: getServiceTotalInStore,
} = fromShared.adapter.getSelectors(getSharedEntitiesState);
