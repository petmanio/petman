import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../core/shared/reducers';
import * as fromShelter from './shelter/shelter.reducer';

export interface ShelterState {
  shelter: fromShelter.State;
}

export interface State extends fromRoot.State {
  shelter: ShelterState;
}

export const reducers = {
  shelter: fromShelter.reducer,
};

export const selectShelterState = createFeatureSelector<ShelterState>('shelter');
