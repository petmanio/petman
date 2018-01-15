import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../core/shared/reducers';
import * as fromOrganization from './organization/organization.reducer';

export interface OrganizationState {
  organization: fromOrganization.State;
}

export interface State extends fromRoot.State {
  organization: OrganizationState;
}

export const reducers = {
  organization: fromOrganization.reducer
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
