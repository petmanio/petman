import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../core/reducers';
import * as fromOrganization from './organization/organization.reducer';
import * as fromPin from './pin/pin.reducer';

export interface OrganizationState {
  organization: fromOrganization.State;
  pin: fromPin.State;
}

export interface State extends fromRoot.State {
  organization: OrganizationState;
}

export const reducers = {
  organization: fromOrganization.reducer,
  pin: fromPin.reducer
};

export const getOrganizationState = createFeatureSelector<OrganizationState>('organization');

/**
 * Entities
 */

export const getOrganizationEntitiesState = createSelector(getOrganizationState, state => state.organization);
export const getSelectedOrganizationId = createSelector(getOrganizationEntitiesState, fromOrganization.getSelectedId);
export const getTotalOrganizations = createSelector(getOrganizationEntitiesState, fromOrganization.getTotal);
export const {
  selectIds: getOrganizationIds,
  selectEntities: getOrganizationEntities,
  selectAll: getAllOrganizations,
  selectTotal: getTotalOrganizationsInStore,
} = fromOrganization.adapter.getSelectors(getOrganizationEntitiesState);
export const getSelectedOrganization = createSelector(getOrganizationEntities, getSelectedOrganizationId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getPinEntitiesState = createSelector(getOrganizationState, state => state.pin);
export const getTotalPins = createSelector(getPinEntitiesState, fromPin.getTotal);
export const {
  selectIds: getPinIds,
  selectEntities: getPinEntities,
  selectAll: getAllPins,
  selectTotal: getTotalPinsInStore,
} = fromPin.adapter.getSelectors(getPinEntitiesState);
